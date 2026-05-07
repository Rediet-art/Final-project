function generateExplanation() {
  const question = document.getElementById("questionInput").value;

  if (question.trim() === "") {
    alert("Please ask a question!");
    return;
  }

  // Save question so next page can access it
  localStorage.setItem("userQuestion", question);

  // Go to result page
  window.location.href = "generate.html";
}

// Run ONLY on generate.html
if (window.location.pathname.includes("generate.html")) {
  const question = localStorage.getItem("userQuestion");
  const resultBox = document.getElementById("resultBox");

  // Mock AI response
  const explanation = mockAI(question);

  resultBox.innerText = explanation;
}

async function generateExplanation() {
  const question = document.getElementById("questionInput").value;

  if (question.trim() === "") {
    alert("Please ask a question!");
    return;
  }

  localStorage.setItem("userQuestion", question);
  window.location.href = "generate.html";
}

// Run only on generate.html
if (window.location.pathname.includes("generate.html")) {
  const question = localStorage.getItem("userQuestion");
  const resultBox = document.getElementById("resultBox");

  resultBox.innerText = "Thinking... 🤔";

  getAIExplanation(question).then(explanation => {
    resultBox.innerText = explanation;
  }).catch(() => {
    resultBox.innerText = "Sorry, I couldn't explain that right now.";
  });
}

// REAL AI FUNCTION
async function getAIExplanation(question) {

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Explain this to a 7 year old in simple words: " + question
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
