import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../../config";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

const itemsPerPage = 5; // Кількість елементів на сторінці

export default function UserList() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
  const [filter, setFilter] = useState(""); // Фільтр по користувачам

  useEffect(() => {
    let filteredCollectionRef = collectionRef;
    if (filter) {
      const filterLower = filter.toLowerCase();
      filteredCollectionRef = query(
        collectionRef,
        where("name", ">=", filterLower),
        where("name", "<", filterLower + "\uf8ff")
      );
    }

    const unsubscribe = onSnapshot(filteredCollectionRef, (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setData(userData);
    });

    return () => unsubscribe();
  }, [filter]);

  // Обчислення індексів елементів на поточній сторінці
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data && data.slice(firstIndex, lastIndex);

  // Обробник зміни сторінки
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Обробник зміни фільтру
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Обробник редагування користувача
  const handleEditUser = (id) => {
    // Ваш код для редагування користувача з використанням id
    console.log("Edit user with ID:", id);
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
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        />
      </div>
      <div>
        {currentData && (
          <div>
            {currentData.map((item) => (
              <div key={item.id}>
                <p>Name: {item.name}</p>
                <p>Surname: {item.surname}</p>
                <p>Date of birth: {item.dateOfBirth}</p>
                <p>Email: {item.email}</p>
                <p>Phone: {item.phone}</p>
                <button onClick={() => handleEditUser(item.id)}>
                  Редагувати
                </button>
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
