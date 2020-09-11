import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getUsers } from "../../apis/users";
import { getEmployees } from "../../apis/employees";
import { getRequests } from "../../apis/requests";

import Container from "../../layout/Container";
import Loader from "../../components/Loader";
import { getRecruitments } from "../../apis/recruitments";
import { getDepartments } from "../../apis/departments";
import { getAssessments } from "../../apis/assessments";
import { getCandidates } from "../../apis/candidates";

export default function Dashboard() {
  // Data master
  const users = useQuery(["users"], getUsers);
  const departments = useQuery(["departments"], getDepartments);
  const recruitments = useQuery(["recruitments"], getRecruitments);

  const employees = useQuery("employees", getEmployees);
  const candidates = useQuery("candidates", getCandidates);
  const requests = useQuery("requests", getRequests);
  const assessments = useQuery("assessments", getAssessments);

  if (
    users.isLoading ||
    requests.isLoading ||
    employees.isLoading ||
    recruitments.isLoading ||
    departments.isLoading ||
    assessments.isLoading ||
    candidates.isLoading
  )
    return <Loader />;
  return (
    <Container className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 text-center">
      <Link
        to="/admin/users"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">{users.data.length}</h1>
        <p>Pengguna</p>
      </Link>
      <Link
        to="/admin/departments"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {departments.data.length}
        </h1>
        <p>Department</p>
      </Link>
      <Link
        to="/admin/requests"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {requests.data.length}
        </h1>
        <p>Permintaan</p>
      </Link>
      <Link
        to="/admin/recruitments"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {recruitments.data.length}
        </h1>
        <p>Penerimaan Karyawan</p>
      </Link>
      <Link
        to="/admin/candidates"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {candidates.data.length}
        </h1>
        <p>[Pending] Calon Karyawan</p>
      </Link>
      <Link
        to="/admin/assessments"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {assessments.data.length}
        </h1>
        <p>Penilaian Karyawan</p>
      </Link>
      <Link
        to="/admin/employees"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <h1 className="md:mr-4 text-xl text-yellow-600">
          {employees.data.length}
        </h1>
        <p>Karyawan</p>
      </Link>
      <Link
        to="/admin/qrview"
        className="block px-4 py-4 md:py-2 md:flex justify-around items-center bg-white rounded shadow font-semibold">
        <p>QR Code View</p>
      </Link>
    </Container>
  );
}
