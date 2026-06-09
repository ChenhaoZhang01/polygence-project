/**
 * Single source of truth that maps the classifier's labels to a UI severity.
 *
 * The backend (microaggressionClassifier/TerminalHeroku.py) serves a 5-class
 * RoBERTa model. The labels below MUST match the model's id2label in
 * microaggressionClassifier/model/config.json. The 5th label, "neutral", is the
 * harmless case: it is intentionally absent from SEVERITY so severityFor()
 * returns null (no warning) for it.
 *
 * Loaded both as a content script (alongside content.js) and in the popup, so
 * the mapping never drifts between the two surfaces. Everything is hung off the
 * global `MAI` object to avoid leaking names.
 */
(function (global) {
  // level: higher = more severe. color: applied to the user's draft text.
  // "neutral" is deliberately not listed here -> treated as clear.
  const SEVERITY = {
    hate_speech: {
      level: 3,
      color: "#8b0000",
      label: "Hate speech",
      message: "This message contains hate speech.",
    },
    overt_microaggression: {
      level: 2,
      color: "#d32f2f",
      label: "Microaggression",
      message: "This message contains a microaggression.",
    },
    subtle_microaggression: {
      level: 1,
      color: "#f57c00",
      label: "Possible microaggression",
      message: "This message may contain a subtle microaggression.",
    },
    general_insult: {
      level: 1,
      color: "#f57c00",
      label: "Insult",
      message: "This message contains an insult.",
    },
  };

  // Below this confidence we treat the prediction as "unsure" and stay quiet,
  // so low-signal text does not nag the user.
  const CONFIDENCE_THRESHOLD = 0.5;

  /**
   * @param {{label: string, score?: number}|null} result
   * @returns {{level:number,color:string,label:string,message:string}|null}
   *          severity object, or null when the message is considered clear.
   */
  function severityFor(result) {
    if (!result || !result.label) return null;
    if (typeof result.score === "number" && result.score < CONFIDENCE_THRESHOLD) {
      return null;
    }
    return SEVERITY[result.label] || null;
  }

  global.MAI = global.MAI || {};
  global.MAI.SEVERITY = SEVERITY;
  global.MAI.CONFIDENCE_THRESHOLD = CONFIDENCE_THRESHOLD;
  global.MAI.severityFor = severityFor;
})(typeof self !== "undefined" ? self : this);
