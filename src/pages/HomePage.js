import React, { useState } from "react";
import CreateUserModal from "../components/CreateUserModal";
import UsersList from "../components/UsersList";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UsersList />
      <br />
      <button onClick={openModal}>Create User</button>

      {/* Модальне вікно створення користувача */}
      {isModalOpen && <CreateUserModal onClose={closeModal} />}
    </>
  );
}
