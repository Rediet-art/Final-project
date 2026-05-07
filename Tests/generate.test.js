const { getExplanation } = require("../generate");

// ✅ Test 1: Normal input
test("Generates explanation correctly", () => {
  const result = getExplanation("what is ai");

  expect(result).toContain("What is ai");
  expect(result).toContain("simple explanation");
});

// ✅ Test 2: Empty input
test("Handles empty input", () => {
  const result = getExplanation("");

  expect(result).toBe("");
});

// ✅ Test 3: Capitalization
test("Capitalizes first letter", () => {
  const result = getExplanation("hello");

  expect(result).toContain("Hello");
});

// ✅ Test 4: Output format
test("Includes explanation structure", () => {
  const result = getExplanation("gravity");

  expect(result.startsWith("Here is a simple explanation")).toBe(true);
});