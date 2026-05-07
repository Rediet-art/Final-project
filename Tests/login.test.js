const { validateLogin } = require("./login");

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


// Setup test data
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("userEmail", "test@email.com");
  localStorage.setItem("userPassword", "123456");
});

test("Correct login", () => {
  const result = validateLogin("test@email.com", "123456");
  expect(result.success).toBe(true);
});

test("Wrong password", () => {
  const result = validateLogin("test@email.com", "wrong");
  expect(result.success).toBe(false);
});

test("Wrong email", () => {
  const result = validateLogin("wrong@email.com", "123456");
  expect(result.success).toBe(false);
});

test("Empty fields", () => {
  const result = validateLogin("", "");
  expect(result.success).toBe(false);
});

test("Missing email only", () => {
  const result = validateLogin("", "123456");
  expect(result.success).toBe(false);
  expect(result.message).toBe("All fields are required");
});

test("Missing password only", () => {
  const result = validateLogin("test@email.com", "");
  expect(result.success).toBe(false);
  expect(result.message).toBe("All fields are required");
});

test("Invalid credentials message", () => {
  const result = validateLogin("wrong@email.com", "wrong");
  expect(result.success).toBe(false);
  expect(result.message).toBe("Invalid email or password");
});