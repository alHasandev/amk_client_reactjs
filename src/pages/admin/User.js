import React from "react";
import Container from "../../layout/Container";
import UserTable from "../../components/UserTable";

export default function User() {
  return (
    <Container className="md:ml-10 grid gap-4">
      <UserTable />
    </Container>
  );
}
