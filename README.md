# Microaggression Identifier — Chrome extension

A Manifest V3 Chrome extension that warns you, in real time, when a message you
are about to send may contain a microaggression, insult, or hate speech. It is
the front end for the model in the **microaggressionClassifier** project, which
serves predictions over a small local Flask API.

## How the two projects fit together

```
 you type in X / Facebook / Instagram / Messenger / Discord
        │
        ▼
 content.js  ──CLASSIFY──▶  background.js  ──POST /print──▶  microaggressionClassifier
 (per-site UI)             (service worker)                  (RoBERTa Flask server, :5000)
        ▲                                                          │
        └──────────────── label + score ◀─────────────────────────┘
```

The classifier returns one of four labels (see
`microaggressionClassifier/RESULTS.md`):
`general_insult`, `overt_microaggression`, `subtle_microaggression`,
`hate_speech`. `extension/severity.js` is the single place that maps those
labels to colors and warning messages.

## Layout

```
extension/
  manifest.json   MV3 manifest
  background.js    service worker — the only thing that talks to the backend
  content.js       one config-driven script for all five sites (PLATFORMS table)
  severity.js      shared label → severity mapping (used by content + popup)
  popup.html/css/js  manual checker + per-site settings + dark mode
  icons/logo.png
main.crx           packed + signed extension
main.pem           signing key (gitignored — keep a private backup)
```

## Per-site modes

Set per site in the popup; stored in `chrome.storage.local` as `<site>Setting`:

| Mode  | Behavior                                            |
|-------|-----------------------------------------------------|
| `0`   | No identifying — do nothing                          |
| `1`   | Warning text — color the draft by severity          |
| `def` | Warning text **and** confirm before sending         |
| `2`   | Block sending — confirm before sending              |

## Run it

1. Start the classifier backend:
   ```bash
   cd ../microaggressionClassifier
   pip install -r requirements.txt
   python TerminalHeroku.py        # serves http://127.0.0.1:5000/print
   ```
2. Load the extension — either:
   - **Unpacked (for development):** `chrome://extensions` → enable Developer
     mode → *Load unpacked* → select the `extension/` folder, or
   - **Packed:** drag `main.crx` onto `chrome://extensions`.

## Re-packing `main.crx`

Keep `main.pem` so the extension keeps the same ID across rebuilds:

```bash
chrome.exe --pack-extension="extension" --pack-extension-key="main.pem"
# produces extension.crx → rename to main.crx
```

## Known limitation

The model has no "harmless" class — every message is scored against the four
categories above. `severity.js` applies a confidence threshold
(`CONFIDENCE_THRESHOLD`) so low-confidence predictions stay quiet, but the
highest-leverage improvement is to add a neutral/harmless class to the training
data (see `microaggressionClassifier/RESULTS.md`).
