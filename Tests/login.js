// ===============================
// LOGIN VALIDATION FUNCTION
// ===============================
function validateLogin(email, password) {
  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  // Check empty fields
  if (!email || !password) {
    return { success: false, message: "All fields are required" };
  }

  // Validate credentials
  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("loggedInUser", email);
    return { success: true };
  }

  return { success: false, message: "Invalid email or password" };
}

// ===============================
// HANDLE LOGIN BUTTON (UI)
// ===============================
/* istanbul ignore next */
function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const result = validateLogin(email, password);

  if (result.success) {
    window.location.href = "dashboard.html";
  } else {
    alert(result.message);
  }
}

// ===============================
// EXPORT FOR JEST TESTING
// ===============================
/* istanbul ignore next */
if (typeof module !== "undefined") {
  module.exports = { validateLogin };
}