/**
 * Service worker. Owns the single network boundary between the extension and the
 * classifier backend (microaggressionClassifier/TerminalHeroku.py).
 *
 * Content scripts and the popup send a CLASSIFY message and get the prediction
 * back via the response callback. Routing through here (instead of fetching from
 * each content script) keeps the host permission and error handling in one place.
 */

const DEFAULT_API_URL = "http://127.0.0.1:5000/print";

async function getApiUrl() {
  const { apiUrl } = await chrome.storage.local.get("apiUrl");
  return apiUrl || DEFAULT_API_URL;
}

/**
 * Calls the backend and normalizes the response.
 * @param {string} text
 * @returns {Promise<{label:string, description?:string, score?:number}>}
 */
async function classify(text) {
  const message = (text || "").trim();
  if (!message) return { label: null };

  const url = await getApiUrl();
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Backend responded ${response.status} ${response.statusText}`);
  }
  return response.json();
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request?.type !== "CLASSIFY") return false;

  classify(request.text)
    .then((result) => sendResponse({ ok: true, result }))
    .catch((error) => sendResponse({ ok: false, error: String(error.message || error) }));

  // Returning true keeps the message channel open for the async sendResponse.
  return true;
});
