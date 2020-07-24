import React from "react";
import { Link } from "react-router-dom";

// Import custom modules
import { CardSmall } from "./Card";

export default function RecruitmentCard({ recruitment }) {
  return (
    <CardSmall>
      <h1 className="font-bold text-xl">{recruitment.title}</h1>
      <h3 className="mb-4">
        Posisi: {recruitment.positionName}, {recruitment.departmentName}
      </h3>

      <p className="description-3 text-justify">{recruitment.description}</p>

      <Link
        to={`/recruitments/${recruitment._id}`}
        className="inline-block bg-yellow-500 text-back hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-sm font-bold mt-4 ml-auto">
        More
      </Link>
    </CardSmall>
  );
}
