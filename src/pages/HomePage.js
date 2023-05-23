import React from "react";
import CreateUser from "../components/CreateUser";
import UsersList from "../components/UsersList";

export default function HomePage() {
  return (
    <>
      <UsersList />
      <br />
      <CreateUser />
    </>
  );
}
