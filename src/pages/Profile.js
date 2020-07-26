import React from "react";
import Container from "../layout/Container";
import { NavLink } from "react-router-dom";

export default function Profile({ children }) {
  return (
    <Container>
      <div className="bg-white flex items-center flex-wrap px-4 py-2 md:px-6 rounded-sm shadow mb-4">
        <NavLink
          to="/profile"
          activeClassName="text-gray-400 cursor-default"
          className="mr-4 text-black">
          <i className="fas fa-arrow-left"></i>
        </NavLink>
        <div className="ml-auto"></div>
        <button className="inline-block px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm font-semibold mr-4">
          Slip Gaji
        </button>
        <button className="inline-block px-4 py-1 text-sm bg-yellow-400 text-black hover:bg-yellow-500 rounded-sm shadow-sm font-semibold mr-4">
          Kehadiran
        </button>
        <button className="inline-block px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm font-semibold mr-4">
          Progress Lamaran
        </button>
        <button className="inline-block px-4 py-1 text-sm bg-yellow-400 text-black hover:bg-yellow-500 rounded-sm shadow-sm font-semibold mr-4">
          Update Profile
        </button>
        <button className="inline-block px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm font-semibold">
          User Setting
        </button>
      </div>
      {children}
    </Container>
  );
}
