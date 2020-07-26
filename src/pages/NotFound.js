import React from "react";
import Container from "../layout/Container";
import { CardMedium } from "../components/Card";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <CardMedium className="flex flex-col md:flex-row items-center">
        <div className="font-bold text-6xl md:text-4xl text-yellow-600 mb-4 md:mr-4 md:mb-0">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <div className="uppercase text-2xl md:text-3xl text-center w-full mb-4 md:-ml-8 md:mb-0">
          <span className="font-bold text-yellow-600 mr-2 md:mr-4">404</span>
          <span className="font-semibold text-gray-900">page not found!</span>
        </div>
        <div className="md:ml-auto">
          <Link
            to="/"
            className="inline-block capitalize bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold px-4 py-2 rounded-sm shadow-sm whitespace-no-wrap">
            back to home
          </Link>
        </div>
      </CardMedium>
    </Container>
  );
}
