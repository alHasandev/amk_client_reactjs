import React from "react";
import Container from "../../layout/Container";
import DepartmentTable from "../../components/DepartmentTable";
import PositionTable from "../../components/PositionTable";

export default function Department() {
  return (
    <Container className="md:ml-10 grid gap-4">
      <DepartmentTable />
      <PositionTable />
    </Container>
  );
}
