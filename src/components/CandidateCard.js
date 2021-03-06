import React from "react";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardSmall } from "./Card";

// Import utilities function
import { calculateAge } from "../utils/time";

export default function CandidateCard({ candidate }) {
  console.log(candidate);
  const profile = candidate.user.profile ? candidate.user.profile : {};
  return (
    <CardSmall className="flex flex-col items-center sm:items-start sm:flex-row text-center sm:text-left lg:transform hover:scale-105 transition-transform duration-300">
      <div className="sm:w-1/3 bg-gray-200 overflow-hidden w-24 rounded-full sm:rounded border-4 border-yellow-600 sm:mr-4">
        <img src={profileImage} alt="profile" className="w-full" />
      </div>
      <div className="sm:w-2/3">
        <h1 className="font-semibold text-xl">{candidate.user.name}</h1>
        <h3 className="text-gray-700 mb-2">
          {profile.gender}, {calculateAge(profile.birthDate)}
        </h3>
        <p className="description-5 text-justify">{profile.bio}</p>
      </div>
    </CardSmall>
  );
}
