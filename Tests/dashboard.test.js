const {
  createDashboardRequest,
  saveDashboardHistory,
  getDashboardUserDisplay
} = require("./dashboard");

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

test("Creates dashboard request with selected level", () => {
  const result = createDashboardRequest(" Why is the sky blue? ", "8-12");

  expect(result.success).toBe(true);
  expect(result.body).toEqual({
    question: "Why is the sky blue?",
    level: "8-12"
  });
});

test("Rejects empty dashboard question", () => {
  const result = createDashboardRequest("   ", "5-8");

  expect(result.success).toBe(false);
  expect(result.message).toBe("Please enter a question.");
});

test("Saves dashboard explanation to logged-in user history", () => {
  localStorage.setItem("loggedInUser", "test@email.com");

  const history = saveDashboardHistory(
    "What is climate change?",
    "Climate change means Earth's weather patterns are changing."
  );

  const savedHistory = JSON.parse(
    localStorage.getItem("history_test@email.com")
  );

  expect(history).toHaveLength(1);
  expect(savedHistory[0].question).toBe("What is climate change?");
  expect(savedHistory[0].explanation).toBe(
    "Climate change means Earth's weather patterns are changing."
  );
});

test("Does not save dashboard history when user is logged out", () => {
  const history = saveDashboardHistory(
    "What is AI?",
    "AI means computers can do smart tasks."
  );

  expect(history).toEqual([]);
  expect(localStorage.getItem("history_guest")).toBeNull();
});

test("Shows logged-in name on dashboard", () => {
  const result = getDashboardUserDisplay("Rediet", "test@email.com");

  expect(result.username).toBe("Rediet");
  expect(result.showAuthButtons).toBe(false);
});

test("Shows guest when dashboard user is logged out", () => {
  const result = getDashboardUserDisplay(null, null);

  expect(result.username).toBe("Guest");
  expect(result.showAuthButtons).toBe(true);
});
