import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../src/config.js";
import HomePage from "./pages/HomePage";

// initializeApp(firebaseConfig);
// const firestore = getFirestore();
// const collectionRef = collection(firestore, "user");

function App() {
  return <HomePage />;
}

export default App;
