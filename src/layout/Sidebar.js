import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="z-10 fixed transform left-0 bottom-0 md:top-0 w-full md:w-auto md:h-screen flex md:flex-col pointer-events-none bg-yellow-600 md:bg-transparent">
      <nav className="grid grid-flow-col md:grid-flow-row gap-2 sm:gap-4 font-semibold mx-auto md:my-auto pointer-events-auto md:ml-2">
        <NavLink to="/admin" className="flex items-center sidebar-item">
          <div className="inline-block bg-yellow-600 text-white px-2 py-2 text-center w-12 md:w-16 sidebar-item-icon shadow-md">
            <i className="fas fa-tachometer-alt text-3xl md:text-xl"></i>
          </div>
          <div className="hidden md:inline-block bg-yellow-400 overflow-hidden text-black px-4 py-2 sidebar-item-label shadow-md">
            Dashboard
          </div>
        </NavLink>
        <NavLink
          to="/admin/recruitments"
          className="flex items-center sidebar-item">
          <div className="inline-block bg-yellow-600 text-white px-2 py-2 text-center w-12 md:w-16 sidebar-item-icon shadow-md">
            <i className="fas fa-scroll text-3xl md:text-xl"></i>
          </div>
          <div className="hidden md:inline-block bg-yellow-400 overflow-hidden text-black px-4 py-2 sidebar-item-label shadow-md">
            Penerimaan
          </div>
        </NavLink>
        <NavLink
          to="/admin/departments"
          className="flex items-center sidebar-item">
          <div className="inline-block bg-yellow-600 text-white px-2 py-2 text-center w-12 md:w-16 sidebar-item-icon shadow-md">
            <i className="fas fa-building text-3xl md:text-xl"></i>
          </div>
          <div className="hidden md:inline-block bg-yellow-400 overflow-hidden text-black px-4 py-2 sidebar-item-label shadow-md">
            Departemen
          </div>
        </NavLink>
        <NavLink
          to="/admin/employees"
          className="flex items-center sidebar-item">
          <div className="inline-block bg-yellow-600 text-white px-2 py-2 text-center w-12 md:w-16 sidebar-item-icon shadow-md">
            <i className="fas fa-user-tie text-3xl md:text-xl"></i>
          </div>
          <div className="hidden md:inline-block bg-yellow-400 overflow-hidden text-black px-4 py-2 sidebar-item-label shadow-md">
            Karyawan
          </div>
        </NavLink>
        <NavLink to="/admin/users" className="flex items-center sidebar-item">
          <div className="inline-block bg-yellow-600 text-white px-2 py-2 text-center w-12 md:w-16 sidebar-item-icon shadow-md">
            <i className="fas fa-users text-3xl md:text-xl"></i>
          </div>
          <div className="hidden md:inline-block bg-yellow-400 overflow-hidden text-black px-4 py-2 sidebar-item-label shadow-md">
            Pengguna
          </div>
        </NavLink>
      </nav>
    </aside>
  );
}
