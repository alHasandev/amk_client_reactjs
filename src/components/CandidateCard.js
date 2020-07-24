import React from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardSmall } from "./Card";

function calculateAge(dob) {
  var diff_ms = Date.now() - new Date(dob).getTime();
  var age_dt = new Date(diff_ms);

  const age = Math.abs(age_dt.getUTCFullYear() - 1970);

  return isNaN(age) ? "Unknown" : `${age} years old`;
}

export default function CandidateCard({ candidate }) {
  const profile = candidate.profile ? candidate.profile : {};

  return (
    <Link to="">
      <CardSmall className="flex flex-col items-center sm:items-start sm:flex-row text-center sm:text-left transform hover:scale-105 transition-transform duration-300">
        <div className="sm:w-1/3 bg-gray-200 overflow-hidden w-24 rounded-full sm:rounded border-4 border-yellow-600 sm:mr-4">
          <img src={profileImage} alt="profile" className="w-full" />
        </div>
        <div className="sm:w-2/3">
          <h1 className="font-semibold text-xl">{candidate.name}</h1>
          <h3 className="text-gray-700 mb-2">
            {profile.gender}, {calculateAge(profile.birthDate)}
          </h3>
          <p className="description-5 text-justify">{profile.bio}</p>
        </div>
      </CardSmall>
    </Link>
  );
}
