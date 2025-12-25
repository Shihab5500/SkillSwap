
export default function prettyAuthError(err, context = "login") {
  const code = (err?.code || "").toLowerCase();

  const map = {
    // --- Common sign-in / sign-up errors ---
    "auth/invalid-credential": "Email or password is incorrect. Please try again.",
    "auth/wrong-password": "Incorrect password. Please check and try again.",
    "auth/user-not-found": "No account found with this email. Please sign up first.",
    "auth/invalid-email": "Invalid email format. Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please wait a while and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection.",

    // --- Google popup-related errors ---
    "auth/popup-closed-by-user": "You closed the Google sign-in window.",
    "auth/cancelled-popup-request": "Another sign-in window is still open. Try again later.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in popup. Allow popups and try again.",

    // --- Account linking or credential conflicts ---
    "auth/account-exists-with-different-credential":
      "This email is already linked with another login method. Please sign in using that method.",

    // --- Password strength or validation (for signup) ---
    "auth/weak-password":
      "Password is too weak. Must include uppercase, lowercase, and at least 6 characters.",
    "auth/email-already-in-use": "This email is already registered. Try logging in instead.",

    // --- Default fallback ---
    default:
      context === "login"
        ? "Login failed. Please check your email and password."
        : "Something went wrong. Please try again later.",
  };

  return map[code] || map.default;
}
