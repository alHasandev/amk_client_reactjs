import React from "react";
import Container from "../../layout/Container";
import EmployeeTable from "../../components/EmployeeTable";

export default function Employee() {
  return (
    <Container className="md:ml-10 grid gap-4">
      <EmployeeTable />
    </Container>
  );
}
