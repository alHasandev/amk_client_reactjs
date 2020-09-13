import React from "react";
import Container from "../../layout/Container";
import { NavLink } from "react-router-dom";
import { CardMini } from "../../components/Card";

export default function Employee({ children }) {
  return (
    <Container className="grid gap-4">
      <CardMini className="w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center">
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
            className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm my-2 md:my-0 md:ml-4">
            Permintaan
          </NavLink>
          <NavLink
            exact
            to={`/admin/attendances/?backLink=/admin/employees`}
            activeClassName="hidden"
            className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm my-2 md:my-0 md:ml-4">
            Kehadiran
          </NavLink>
          <NavLink
            exact
            to={`/admin/assessments/?backLink=/admin/employees`}
            activeClassName="hidden"
            className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm my-2 md:my-0 md:ml-4">
            Penilaian
          </NavLink>
          <NavLink
            exact
            to={`/admin/payloads/?backLink=/admin/employees`}
            activeClassName="hidden"
            className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm my-2 md:my-0 md:ml-4">
            Penggajihan
          </NavLink>
        </div>
      </CardMini>
      {children}
    </Container>
  );
}
