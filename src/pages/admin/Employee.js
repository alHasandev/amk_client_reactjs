import React from "react";
import Container from "../../layout/Container";
import EmployeeTable from "../../components/EmployeeTable";
import { Link } from "react-router-dom";

export default function Employee() {
  return (
    <Container className="grid gap-4">
      <div className="bg-white px-4 py-2 rounded-sm shadow-md w-full max-w-screen-xl mx-auto">
        <form action="">
          <div className="flex items-center">
            <Link to="/admin/employees" className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="px-4 py-1 bg-gray-200 focus:outline-none rounded-sm w-full"
            />
            <Link
              to={`/admin/employees/create`}
              className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm ml-4">
              New Employee
            </Link>
          </div>
        </form>
      </div>
      <EmployeeTable />
    </Container>
  );
}
