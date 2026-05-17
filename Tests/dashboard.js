// ===============================
// DASHBOARD TESTABLE FUNCTIONS
// ===============================
function createDashboardRequest(question, level) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      success: false,
      message: "Please enter a question."
    };
  }

  return {
    success: true,
    body: {
      question: trimmedQuestion,
      level
    }
  };
}

function saveDashboardHistory(question, explanation) {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    return [];
  }

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

function getDashboardUserDisplay(loggedInName, loggedInUser) {
  if (loggedInUser) {
    return {
      username: loggedInName || loggedInUser,
      showAuthButtons: false
    };
  }

  return {
    username: "Guest",
    showAuthButtons: true
  };
}

// ===============================
// EXPORT FOR JEST TESTING
// ===============================
/* istanbul ignore next */
if (typeof module !== "undefined") {
  module.exports = {
    createDashboardRequest,
    saveDashboardHistory,
    getDashboardUserDisplay
  };
}
