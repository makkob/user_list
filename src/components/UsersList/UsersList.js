import React, { useEffect, useState } from "react";
import {
  Pen,
  Search,
  PersonAdd,
  Phone,
  Calendar2Date,
  Mailbox,
  PersonBadge,
  PersonFillX,
  PersonFillGear,
} from "react-bootstrap-icons";
import {
  Button,
  InputGroup,
  Form,
  Pagination,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styles from "./UsersList.module.css";
import CreateUserModal from "../CreateUserModal";
import { firebaseConfig } from "../../config";
import { handleDeleteUser } from "../../service/deliteUser.js";
import EditUserModal from "../EditUserModal";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

const itemsPerPage = 5; // Кількість елементів на сторінці

export default function UserList() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка
  const [filter, setFilter] = useState(""); // Фільтр користувачів
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null); // Дані для редагування користувача

  useEffect(() => {
    let filteredCollectionRef = collectionRef;
    if (filter) {
      filteredCollectionRef = query(
        collectionRef,
        where("name", ">=", filter),
        where("name", "<", filter + "\uf8ff")
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

  // Обчислюємо індекси елементів на поточній сторінці
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = data && data.slice(firstIndex, lastIndex);

  // Обробка зміни сторінки
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Обробка зміни фільтра
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Обробка редагування користувача
  const handleEditUser = (id) => {
    console.log("Редагувати користувача з ID:", id);
    setShowEditModal(true);
    const user = data.find((item) => item.id === id);
    if (user) {
      setEditModalData(user);
    }
    console.log("editModalData>>>>>>>>>>>>>>>>>>>>>", editModalData);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <div>
        <InputGroup
          className="mb-3"
          onChange={handleFilterChange}
          value={filter}
          size="lg"
        >
          <InputGroup.Text id="basic-addon1">
            <Search /> Фільтрувати за ім'ям користувача{" "}
          </InputGroup.Text>
          <Form.Control
            placeholder="Ім'я користувача"
            aria-label="Ім'я користувача"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <CreateUserModal />
        <EditUserModal
          show={showEditModal}
          onClose={handleCloseEditModal}
          name={editModalData?.name}
          surname={editModalData?.surname}
          email={editModalData?.email}
          phone={editModalData?.phone}
          dateOfBirth={editModalData?.dateOfBirth}
          id={editModalData?.id}
        />
      </div>
      <div className={styles.container}>
        {currentData && (
          <>
            {currentData.map((item) => (
              <Card key={item.id} className={styles.item}>
                <Card.Body>
                  <Card.Title>
                    <PersonBadge /> {item.name} {item.surname}
                  </Card.Title>
                  <Card.Text>
                    <Calendar2Date /> {item.dateOfBirth}
                  </Card.Text>
                  <Card.Text>
                    <Mailbox /> {item.email}
                  </Card.Text>
                  <Card.Text>
                    <Phone /> {item.phone}
                  </Card.Text>
                  <ButtonGroup
                    aria-label="First group"
                    className={styles.buttonGroup}
                  >
                    <Button
                      variant="secondary"
                      onClick={() => handleEditUser(item.id)}
                    >
                      Редагувати <PersonFillGear />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Видалити
                      <PersonFillX />
                    </Button>{" "}
                  </ButtonGroup>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </div>
      {/* Відображення пагінації */}
      <Pagination className={styles.pagination}>
        {data &&
          Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
      </Pagination>
    </>
  );
}
