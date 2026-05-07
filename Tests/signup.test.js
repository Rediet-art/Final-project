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

const { validateSignup } = require("./signup");

beforeEach(() => {
  localStorage.clear();
});

// ✅ TEST CASES

test("Successful signup", () => {
  const result = validateSignup("test@email.com", "123456", "123456");
  expect(result.success).toBe(true);
});

test("Empty fields", () => {
  const result = validateSignup("", "", "");
  expect(result.success).toBe(false);
  expect(result.message).toBe("All fields are required");
});

test("Passwords do not match", () => {
  const result = validateSignup("test@email.com", "123456", "wrong");
  expect(result.success).toBe(false);
  expect(result.message).toBe("Passwords do not match");
});

test("Password too short", () => {
  const result = validateSignup("test@email.com", "123", "123");
  expect(result.success).toBe(false);
  expect(result.message).toBe("Password must be at least 6 characters");
});

test("User saved to localStorage", () => {
  validateSignup("test@email.com", "123456", "123456");

  expect(localStorage.getItem("userEmail")).toBe("test@email.com");
  expect(localStorage.getItem("userPassword")).toBe("123456");
});