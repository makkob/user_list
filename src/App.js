import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGrozMPg-RIgeRcbyawebbYga9Nny6VCw",
  authDomain: "urbsofttest.firebaseapp.com",
  projectId: "urbsofttest",
  storageBucket: "urbsofttest.appspot.com",
  messagingSenderId: "876617151767",
  appId: "1:876617151767:web:eccf919fe680ab00caf352",
  measurementId: "G-PJ6GTJ9H3R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore();
const collectionRef = collection(firestore, "collectionName");

function App() {
  useEffect(() => {
    // Отримати дані один раз
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Обробка отриманих даних для кожного документа
          console.log(data);
        });
      } catch (error) {
        console.error("Помилка при отриманні даних з Firebase:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
