import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../../config";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

export default function CreateUserModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCreateUser = async () => {
    try {
      const newUser = {
        name,
        surname,
        dateOfBirth,
        email,
        phone,
      };

      await addDoc(collectionRef, newUser);

      // Очистити поля після створення користувача
      setName("");
      setSurname("");
      setDateOfBirth("");
      setEmail("");
      setPhone("");

      console.log("User created successfully!");

      onClose(); // Закрити модальне вікно після створення користувача
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Create User</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <input
          type="text"
          value={surname}
          onChange={handleSurnameChange}
          placeholder="Surname"
        />
        <input
          type="text"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          placeholder="Date of Birth"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone"
        />
        <button onClick={handleCreateUser}>Create User</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
