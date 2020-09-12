import React from "react";
import Container from "../../layout/Container";
import { NavLink } from "react-router-dom";

export default function Employee({ children }) {
  return (
    <Container className="grid gap-4">
      <div className="bg-white px-4 py-2 rounded-sm shadow-md w-full max-w-screen-xl mx-auto">
        <form action="">
          <div className="flex items-center">
            <NavLink
              exact
              to="/admin/employees"
              activeClassName="text-gray-500 pointer-events-none"
              className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
            <div className="ml-auto"></div>
            <NavLink
              exact
              to={`/admin/requests/?backLink=/admin/employees`}
              activeClassName="hidden"
              className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm ml-4">
              Permintaan
            </NavLink>
            <NavLink
              exact
              to={`/admin/attendances/?backLink=/admin/employees`}
              activeClassName="hidden"
              className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm ml-4">
              Kehadiran
            </NavLink>
            <NavLink
              exact
              to={`/admin/assessments/?backLink=/admin/employees`}
              activeClassName="hidden"
              className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm ml-4">
              Penilaian
            </NavLink>
            <NavLink
              exact
              to={`/admin/payloads/?backLink=/admin/employees`}
              activeClassName="hidden"
              className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm ml-4">
              Penggajihan
            </NavLink>
          </div>
        </form>
      </div>
      {children}
    </Container>
  );
}
