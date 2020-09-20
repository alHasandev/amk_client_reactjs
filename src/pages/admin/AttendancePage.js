import React from "react";
import Container from "../../layout/Container";
import { NavLink } from "react-router-dom";
import { backLink } from "../../utils/url";

export default function AttendancePage({ children }) {
  return (
    <Container className="grid gap-4">
      <div className="bg-white px-4 py-2 rounded-sm shadow-md w-full max-w-screen-xl mx-auto">
        <form action="">
          <div className="flex items-center">
            <NavLink
              exact
              to={backLink("/admin/attendances")}
              activeClassName="text-gray-500 pointer-events-none"
              className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
            <div className="ml-auto"></div>
            <NavLink
              to="/admin/attendances/daily"
              className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 mb-4 md:mb-0 md:ml-4">
              Harian
            </NavLink>
            <NavLink
              to="/admin/attendances/monthly"
              className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 mb-4 md:mb-0 md:ml-4">
              Bulanan
            </NavLink>
          </div>
        </form>
      </div>
      {children}
    </Container>
  );
}
