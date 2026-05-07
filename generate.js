// Core logic function
function getExplanation(question) {
  if (!question) return "";

  const formatted =
    question.charAt(0).toUpperCase() + question.slice(1);

  return `Here is a simple explanation:\n\n${formatted} is something we can explain using easy words so children can understand it.`;
}
const level = document.getElementById("level").value;

// Export for testing
/* istanbul ignore next */
if (typeof module !== "undefined") {
  module.exports = { getExplanation };
}