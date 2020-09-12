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
          </div>
        </form>
      </div>
      {children}
    </Container>
  );
}