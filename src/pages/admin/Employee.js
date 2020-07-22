import React from "react";
import Background from "../../layout/Background";
import Container from "../../layout/Container";
import EmployeeTable from "../../components/EmployeeTable";

export default function Employee() {
  return (
    <Background className="px-4">
      <Container className="md:ml-10 grid gap-4">
        <EmployeeTable />
      </Container>
    </Background>
  );
}
