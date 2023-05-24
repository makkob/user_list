import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../../config";
import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import {
  PersonBadge,
  PersonPlus,
  Phone,
  Calendar2Date,
  CheckLg,
} from "react-bootstrap-icons";
import styles from "./CreateUserModal.module.css";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

export default function CreateUserModal() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+380 (");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    let formattedValue = "";
    if (value.length >= 2) {
      formattedValue +=
        "+" + value.slice(0, 3) + " (" + value.slice(3, 5) + ")";
    }
    if (value.length >= 5) {
      formattedValue += " " + value.slice(5, 8);
    }
    if (value.length >= 8) {
      formattedValue += "-" + value.slice(8, 10);
    }
    if (value.length >= 10) {
      formattedValue += "-" + value.slice(10, 12);
    }

    setPhone(formattedValue);

    // При натисканні на бекспейс
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      const lastChar = formattedValue.charAt(formattedValue.length - 1);
      if (lastChar === ")" || lastChar === "-" || lastChar === " ") {
        setPhone(formattedValue.slice(0, formattedValue.length - 2));
      } else {
        setPhone(formattedValue.slice(0, formattedValue.length - 1));
      }
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    // Чек на пусте поле
    if (!name || !surname || !dateOfBirth || !email || !phone) {
      console.log("Please fill in all fields.");
      return;
    }

    try {
      const newUser = {
        name,
        surname,
        dateOfBirth,
        email,
        phone,
      };

      await addDoc(collectionRef, newUser);

      // Очистити поля
      setName("");
      setSurname("");
      setDateOfBirth("");
      setEmail("");
      setPhone("+380 (");

      console.log("User created successfully!");

      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className={styles.createUserButton}
      >
        <PersonPlus /> Створити користувача
      </Button>

      <Modal show={show} onHide={handleClose}>
        {" "}
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Заповнити інформацію про користувача</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <PersonBadge />{" "}
              </InputGroup.Text>
              <Form.Control
                aria-label="Name"
                placeholder="Name"
                onChange={handleNameChange}
                value={name}
                required
              />
              <Form.Control
                aria-label="Surname"
                placeholder="Surname"
                onChange={handleSurnameChange}
                value={surname}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                aria-describedby="basic-addon1"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                <Phone />
              </InputGroup.Text>
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={handlePhoneChange}
                value={phone}
                placeholder="+380 (xx) xxx-xx-xx"
                required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon4">
                <Calendar2Date /> Date of Birth
              </InputGroup.Text>
              <Form.Control
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCreateUser} type="submit">
              <CheckLg /> Відправити форму
            </Button>
          </Modal.Footer>{" "}
        </Form>
      </Modal>
    </>
  );
}
