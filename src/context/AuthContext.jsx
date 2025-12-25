// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   signInWithPopup,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
//   const googleLogin = () => signInWithPopup(auth, googleProvider);
//   const signup = (email, pass, name, photo) =>
//     createUserWithEmailAndPassword(auth, email, pass).then(async ({ user }) => {
//       await updateProfile(user, { displayName: name, photoURL: photo });
//       return user;
//     });
//   const logout = () => signOut(auth);
//   const resetPassword = (email) => sendPasswordResetEmail(auth, email);

//   const value = { user, loading, login, googleLogin, signup, logout, resetPassword };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }



// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase"; // তোমার firebase.config.js এর default export
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthCtx = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // persist login after refresh
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).finally(() => {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      });
      return () => unsub();
    });
  }, []);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const updateUserProfile = (displayName, photoURL) =>
    updateProfile(auth.currentUser, { displayName, photoURL });

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const value = {
    user,
    loading,
    signup,
    login,
    googleLogin,
    logout,
    updateUserProfile,
    resetPassword,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
