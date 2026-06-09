/**
 * Popup logic: a manual message checker plus the per-site settings UI.
 * State lives in chrome.storage.local; content scripts react via storage events.
 */
(function () {
  "use strict";

  const SITE_KEYS = [
    "twitterSetting",
    "facebookSetting",
    "instagramSetting",
    "messengerSetting",
    "discordSetting",
  ];
  const DEFAULT_MODE = "def";

  const inputText = document.getElementById("inputText");
  const submitButton = document.getElementById("submitButton");
  const output = document.getElementById("output");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const resetDefaults = document.getElementById("resetDefaults");
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));

  // --- manual message check -------------------------------------------------

  function showResult(severity) {
    if (!severity) {
      output.textContent = "No microaggression detected.";
      output.style.color = "";
      return;
    }
    output.textContent = severity.message;
    output.style.color = severity.color;
  }

  function checkMessage() {
    const text = inputText.value.trim();
    if (!text) {
      output.textContent = "";
      return;
    }
    output.textContent = "Checking...";
    output.style.color = "";

    chrome.runtime.sendMessage({ type: "CLASSIFY", text }, (response) => {
      if (chrome.runtime.lastError || !response || !response.ok) {
        output.textContent =
          "Could not reach the classifier. Is the backend running on port 5000?";
        output.style.color = "#d32f2f";
        return;
      }
      showResult(self.MAI.severityFor(response.result));
      chrome.storage.local.set({ checkedText: text });
    });
  }

  submitButton.addEventListener("click", checkMessage);
  inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkMessage();
  });

  // --- settings load / persist ---------------------------------------------

  chrome.storage.local.get([...SITE_KEYS, "darkMode", "checkedText"], (result) => {
    dropdowns.forEach((d) => {
      const select = d.querySelector("select");
      select.value = result[d.dataset.site] || DEFAULT_MODE;
    });
    if (result.darkMode) document.body.classList.add("dark-mode");
    if (result.checkedText) inputText.value = result.checkedText;
  });

  dropdowns.forEach((d) => {
    const select = d.querySelector("select");
    select.addEventListener("change", () => {
      chrome.storage.local.set({ [d.dataset.site]: select.value });
    });
  });

  darkModeToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("dark-mode");
    chrome.storage.local.set({ darkMode: enabled });
  });

  resetDefaults.addEventListener("click", () => {
    const defaults = {};
    SITE_KEYS.forEach((key) => (defaults[key] = DEFAULT_MODE));
    defaults.darkMode = false;
    chrome.storage.local.set(defaults);

    dropdowns.forEach((d) => {
      d.querySelector("select").value = DEFAULT_MODE;
    });
    document.body.classList.remove("dark-mode");
  });
})();
