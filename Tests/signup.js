// ===============================
// SIGNUP VALIDATION FUNCTION
// ===============================
function validateSignup(email, password, confirmPassword) {
  // Check empty fields
  if (!email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" };
  }

  // Check password match
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  // Check password length
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters" };
  }

  // Save user
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  return { success: true };
}

// ===============================
// HANDLE SIGNUP BUTTON
// ===============================
/* istanbul ignore next */
function handleSignup() {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const result = validateSignup(email, password, confirmPassword);

  if (result.success) {
    alert("Signup successful!");
    window.location.href = "login.html";
  } else {
    alert(result.message);
  }
}

// ===============================
// EXPORT FOR TESTING
// ===============================
/* istanbul ignore next */
if (typeof module !== "undefined") {
  module.exports = { validateSignup };
}