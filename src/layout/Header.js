import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Import static assets
import { logo } from "../assets";
import { AuthContext } from "../provider/Auth";

// Internal partial components
function GuestAuthLink() {
  return (
    <>
      <Link
        to="/login"
        className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
        <i className="fas fa-sign-in-alt mr-2"></i>Login
      </Link>
      <Link
        to="/register"
        className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
        <i className="fas fa-edit mr-2"></i>Register
      </Link>
    </>
  );
}

function UserAuthLink() {
  return (
    <>
      <Link
        to="/user/profile"
        className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
        <i className="fas fa-user mr-2"></i>Profile
      </Link>
      <Link
        to="/logout"
        className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
        <i className="fas fa-sign-out-alt mr-2"></i>Logout
      </Link>
    </>
  );
}

// Main components
export default function Header() {
  const { pathname } = useLocation();

  const [auth] = useContext(AuthContext);
  const [displayMenu, setDislayMenu] = useState("hidden");

  useEffect(() => {
    setDislayMenu("hidden");
  }, [pathname]);

  return (
    <header className="absolute w-full px-4 bg-black bg-opacity-0 text-gray-400">
      <section className="flex items-center max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="w-10 py-4 mr-2 md:py-0 md:w-16 md:mr-6 flex-shrink-0">
          <img src={logo} className="max-w-full" alt="" />
        </Link>
        <Link to="/" className="hover:text-yellow-500 flex items-baseline">
          <i className="hidden md:inline-block fas fa-home mr-2"></i>Home
        </Link>
        <button
          className="ml-auto hover:text-yellow-500 focus:outline-none md:hidden"
          onClick={(ev) => setDislayMenu("flex")}>
          <i className="fas fa-bars"></i>
        </button>
        <nav
          className={`${displayMenu} bg-black bg-opacity-100 w-full min-h-screen flex-col items-center z-30 md:z-0 text-center md:flex fixed top-0 right-0 md:bg-opacity-0 md:flex-row md:static md:min-h-0`}>
          <button
            className="hover:text-yellow-500 mt-4 px-4 py-2 focus:outline-none md:hidden md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0"
            onClick={(ev) => setDislayMenu("hidden")}>
            <i className="fas fa-times"></i>
          </button>
          <Link
            to="/recruitments"
            className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
            <i className="fas fa-scroll mr-2"></i>Recruitments
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-500 px-4 py-2 md:px-0 md:py-0 md:ml-4 md:my-0 md:mr-0">
            <i className="fas fa-stamp mr-2"></i>About
          </Link>

          <div className="md:ml-auto"></div>
          {!auth.token ? <GuestAuthLink /> : <UserAuthLink />}
        </nav>
      </section>
    </header>
  );
}
