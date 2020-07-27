import React from "react";
import Container from "../../layout/Container";
import DepartmentTable from "../../components/DepartmentTable";
import PositionTable from "../../components/PositionTable";
import { useParams } from "react-router-dom";

export default function Department() {
  const params = useParams();
  console.log(params);
  return (
    <Container className="grid gap-4">
      <DepartmentTable />
      {params.id && <PositionTable />}
    </Container>
  );
}
