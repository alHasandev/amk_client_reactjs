import React from "react";
import Background from "../../layout/Background";
import Container from "../../layout/Container";
import DepartmentTable from "../../components/DepartmentTable";
import PositionTable from "../../components/PositionTable";

export default function Department() {
  return (
    <Background className="px-4">
      <Container className="md:ml-10 grid gap-4">
        <DepartmentTable />
        <PositionTable />
      </Container>
    </Background>
  );
}
