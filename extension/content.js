/**
 * Unified content script for every supported site.
 *
 * Replaces the five near-identical scripts (twitter/facebook/instagram/
 * messenger/discord) with one config-driven implementation. Per-site differences
 * are isolated to the PLATFORMS table; the behavior below is shared.
 *
 * Modes (chosen per-site in the popup, stored under `<site>Setting`):
 *   "0"   off            - do nothing
 *   "1"   warn text      - color the draft by severity
 *   "def" warn + popup   - color the draft AND confirm before sending
 *   "2"   block sending  - color the draft AND confirm before sending
 */
(function () {
  "use strict";

  const PLATFORMS = {
    "x.com":          { key: "twitterSetting",   input: 'span[data-text="true"]',         send: '[data-testid="tweetButtonInline"]', trigger: "click" },
    "twitter.com":    { key: "twitterSetting",   input: 'span[data-text="true"]',         send: '[data-testid="tweetButtonInline"]', trigger: "click" },
    "facebook.com":   { key: "facebookSetting",  input: 'span[data-lexical-text="true"]', send: '[aria-label="Post"]',               trigger: "click" },
    "instagram.com":  { key: "instagramSetting", input: 'span[data-lexical-text="true"]', field: 'div[aria-label="Message"]',        trigger: "enter" },
    "messenger.com":  { key: "messengerSetting", input: 'span[data-lexical-text="true"]', field: 'div[aria-label="Message"]',        trigger: "enter" },
    "discord.com":    { key: "discordSetting",   input: 'span[data-slate-string="true"]', field: 'div[role="textbox"]',              trigger: "enter" },
  };

  /** Pick the config for the current site (matches "x.com" against "www.x.com"). */
  function resolvePlatform() {
    const host = location.hostname;
    const domain = Object.keys(PLATFORMS).find(
      (d) => host === d || host.endsWith("." + d)
    );
    return domain ? PLATFORMS[domain] : null;
  }

  const config = resolvePlatform();
  if (!config) return;

  const DEFAULT_MODE = "def";
  let mode = DEFAULT_MODE;
  let severity = null;     // current MAI severity object, or null when clear
  let lastClassified = ""; // last text we sent to the backend (dedupe)

  // --- settings -------------------------------------------------------------

  chrome.storage.local.get(config.key, (result) => {
    mode = result[config.key] || DEFAULT_MODE;
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[config.key]) {
      mode = changes[config.key].newValue || DEFAULT_MODE;
    }
  });

  // --- reading the draft ----------------------------------------------------

  function getDraftElement() {
    return document.querySelector(config.input);
  }

  function getDraftText() {
    const el = getDraftElement();
    return el ? el.innerText.trim() : "";
  }

  // --- classification -------------------------------------------------------

  function classify(text) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "CLASSIFY", text }, (response) => {
        if (chrome.runtime.lastError || !response || !response.ok) {
          resolve(null);
          return;
        }
        resolve(response.result);
      });
    });
  }

  async function refresh() {
    if (mode === "0") {
      severity = null;
      return;
    }
    const text = getDraftText();
    if (text === lastClassified) return; // nothing changed
    lastClassified = text;

    if (!text) {
      severity = null;
      paintDraft();
      return;
    }
    const result = await classify(text);
    severity = self.MAI.severityFor(result);
    paintDraft();
  }

  /** Tint the draft text according to severity (modes 1 / def / 2). */
  function paintDraft() {
    const el = getDraftElement();
    if (!el) return;
    el.style.color = severity && mode !== "0" ? severity.color : "";
  }

  // Poll the draft on a single timer instead of stacking keypress listeners.
  setInterval(refresh, 400);

  // --- send interception ----------------------------------------------------

  function shouldIntercept() {
    return (mode === "def" || mode === "2") && severity !== null;
  }

  function confirmSend(event) {
    if (!shouldIntercept()) return;
    const proceed = window.confirm(
      `${severity.message} Are you sure you want to send it?`
    );
    if (!proceed) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  if (config.trigger === "click") {
    // Capture-phase delegation: works even as the send button re-renders.
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (target.closest && target.closest(config.send)) confirmSend(event);
      },
      true
    );
  } else {
    // Enter-to-send sites: intercept Enter (without Shift) inside the input field.
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Enter" || event.shiftKey) return;
        const active = document.activeElement;
        if (config.field && active && active.closest(config.field)) {
          confirmSend(event);
        }
      },
      true
    );
  }
})();
