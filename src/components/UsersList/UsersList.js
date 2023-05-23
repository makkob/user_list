import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../../config";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

export default function UserList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setData(userData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        {data && (
          <div>
            {data.map((item) => (
              <div key={item._id}>
                <p>Name: {item.name}</p>
                <p>Surname: {item.surname}</p>
                <p>Date of birth: {item.dateOfBirth}</p>
                <p>Email: {item.email}</p>
                <p>Phone: {item.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
