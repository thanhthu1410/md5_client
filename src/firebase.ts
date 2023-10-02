import { initializeApp } from "firebase/app";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/* thay config thành config của bạn */
const firebaseConfig = {
  apiKey: "AIzaSyDVu1CJtgEKCzgx8kW3er-V9ERaLPp2L2g",
  authDomain: "md05furniturestore.firebaseapp.com",
  projectId: "md05furniturestore",
  storageBucket: "md05furniturestore.appspot.com",
  messagingSenderId: "714771360672",
  appId: "1:714771360672:web:734fd8381dd8e9b38f12c5",
  measurementId: "G-5E72K74JBB"
};

const app = initializeApp(firebaseConfig);

/* Google Auth Import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
    let auth = getAuth(app);
    return await signInWithPopup(auth, googleProvider)
}