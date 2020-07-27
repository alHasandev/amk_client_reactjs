import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Topbar({
  homeLink = "",
  links = [],
  children,
  menu: Menu,
}) {
  const [isTopbarCollapse, setIsTopbarCollapse] = useState(true);
  return (
    <div className="bg-white flex flex-col md:flex-row md:items-center px-4 py-2 md:px-8 rounded-sm shadow mb-4">
      <div className="flex items-center w-full">
        <NavLink
          exact
          to={homeLink}
          activeClassName="text-gray-400 cursor-default"
          className="inline-block text-black">
          <i className="fas fa-arrow-left"></i>
        </NavLink>
        {children}
        <button
          className="inline-block ml-auto md:hidden text-yellow-600 focus:outline-none"
          onClick={(ev) => setIsTopbarCollapse((is) => !is)}>
          <i
            className={`fas ${
              isTopbarCollapse ? "fa-chevron-down" : "fa-chevron-up"
            }`}></i>
        </button>
      </div>
      <div className="ml-auto"></div>
      <div
        className={`${
          isTopbarCollapse ? "hidden" : "flex"
        } flex-col md:flex md:flex-row mt-4 md:mt-0`}>
        {Menu && <Menu />}
        {links.length > 0 &&
          links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              activeStyle={{ boxShadow: "0 0 0 2px rgba(26, 32, 44, 1)" }}
              className={`inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold mb-4 md:mb-0 md:ml-4 ${link.className}`}>
              {link.label}
            </NavLink>
          ))}
      </div>
    </div>
  );
}
