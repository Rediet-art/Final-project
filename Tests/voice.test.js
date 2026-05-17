const {
  cleanSpeechText,
  createVoiceRequest,
  saveVoiceHistory
} = require("./voice");

// Mock localStorage
global.localStorage = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = value.toString();
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  }
};

beforeEach(() => {
  localStorage.clear();
});

test("Creates voice request with child level", () => {
  const result = createVoiceRequest(" What is gravity? ");

  expect(result.success).toBe(true);
  expect(result.body).toEqual({
    question: "What is gravity?",
    level: "5-8"
  });
});

test("Rejects empty voice question", () => {
  const result = createVoiceRequest("   ");

  expect(result.success).toBe(false);
  expect(result.message).toBe("Please say something first.");
});

test("Cleans text before speaking", () => {
  const result = cleanSpeechText("Hello 🎤 child!!!   Learn @ AI #1");

  expect(result).toBe("Hello child!!! Learn AI 1");
});

test("Saves voice question to user history", () => {
  localStorage.setItem("loggedInUser", "test@email.com");

  const history = saveVoiceHistory(
    "What is AI?",
    "AI means computers can do smart tasks."
  );

  const savedHistory = JSON.parse(
    localStorage.getItem("history_test@email.com")
  );

  expect(history).toHaveLength(1);
  expect(savedHistory[0].question).toBe("What is AI?");
  expect(savedHistory[0].explanation).toBe(
    "AI means computers can do smart tasks."
  );
});

test("Saves voice history for guest when no user is logged in", () => {
  saveVoiceHistory("What is the sun?", "The sun is a star.");

  const savedHistory = JSON.parse(localStorage.getItem("history_guest"));

  expect(savedHistory).toHaveLength(1);
  expect(savedHistory[0].question).toBe("What is the sun?");
});
