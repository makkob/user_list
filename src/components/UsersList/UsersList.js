import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "../../config";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

const itemsPerPage = 1; // Кількість елементів на сторінці

export default function UserList() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка

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

  // Обчислення індексів елементів на поточній сторінці
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data && data.slice(firstIndex, lastIndex);

  // Обробник зміни сторінки
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Рендеринг пагінації
  const renderPagination = () => {
    const totalPages = Math.ceil((data && data.length) / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }

    return <div>{pages}</div>;
  };

  return (
    <div>
      <div>
        {currentData && (
          <div>
            {currentData.map((item) => (
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
      {/* Відображення пагінації */}
      {renderPagination()}
    </div>
  );
}
