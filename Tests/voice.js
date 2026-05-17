// ===============================
// VOICE PAGE TESTABLE FUNCTIONS
// ===============================
function cleanSpeechText(text) {
  return text
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
    .replace(/[^\w\s.,!?'"()-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function createVoiceRequest(question) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      success: false,
      message: "Please say something first."
    };
  }

  return {
    success: true,
    body: {
      question: trimmedQuestion,
      level: "5-8"
    }
  };
}

function saveVoiceHistory(question, explanation) {
  const user = localStorage.getItem("loggedInUser") || "guest";
  const historyKey = "history_" + user;
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];

  history.push({
    question,
    explanation,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(historyKey, JSON.stringify(history));

  return history;
}

// ===============================
// EXPORT FOR JEST TESTING
// ===============================
/* istanbul ignore next */
if (typeof module !== "undefined") {
  module.exports = {
    cleanSpeechText,
    createVoiceRequest,
    saveVoiceHistory
  };
}
