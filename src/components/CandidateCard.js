import React from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardSmall } from "./Card";

export default function CandidateCard() {
  return (
    <Link to="">
      <CardSmall className="flex flex-col items-center sm:flex-row text-center sm:text-left transform hover:scale-105 transition-transform duration-300">
        <div className="sm:w-1/3 bg-gray-200 overflow-hidden w-24 rounded-full sm:rounded border-4 border-yellow-600 sm:mr-4">
          <img src={profileImage} alt="profile" className="w-full" />
        </div>
        <div className="sm:w-2/3">
          <h1 className="font-semibold text-xl">Nama Calon Karyawan</h1>
          <h3 className="text-gray-700 mb-2">Pendidikan Terakhir</h3>
          <p className="description-5 text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
            laborum asperiores vitae dolor praesentium reiciendis architecto
            itaque sequi unde fugiat incidunt ut optio officia iusto cumque iure
            repudiandae, numquam neque?
          </p>
        </div>
      </CardSmall>
    </Link>
  );
}
