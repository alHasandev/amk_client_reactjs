import React from "react";
import Background from "../../layout/Background";
import Container from "../../layout/Container";
import UserTable from "../../components/UserTable";

export default function User() {
  return (
    <Background className="px-4">
      <Container className="md:ml-10 grid gap-4">
        <UserTable />
      </Container>
    </Background>
  );
}
