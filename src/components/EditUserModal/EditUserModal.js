import React, { useState, useEffect } from "react";
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
import styles from "./EditUserModal.module.css";

initializeApp(firebaseConfig);
const firestore = getFirestore();
const collectionRef = collection(firestore, "user");

export default function EditUserModal(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    setName(props.name || "");
    setSurname(props.surname || "");
    setEmail(props.email || "");
    setPhone(props.phone || "");
    setDateOfBirth(props.dateOfBirth || "");
  }, [props.name, props.surname, props.email, props.phone, props.dateOfBirth]);

  const handleClose = () => {
    props.onClose();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Змінити інформацію про користувача</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <PersonBadge />{" "}
              </InputGroup.Text>
              <Form.Control
                aria-label="Name"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                required
              />
              <Form.Control
                aria-label="Surname"
                placeholder="Surname"
                value={surname}
                onChange={handleSurnameChange}
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
                value={email}
                onChange={handleEmailChange}
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
                value={phone}
                onChange={handlePhoneChange}
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
            <Button
              variant="primary"
              //  onClick={handleCreateUser}
              type="submit"
            >
              <CheckLg /> Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
