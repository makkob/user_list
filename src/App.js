import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../src/config.js";
import HomePage from "./pages/HomePage";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

function App() {
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log("Data from Firebase:", data);
  //     });
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
