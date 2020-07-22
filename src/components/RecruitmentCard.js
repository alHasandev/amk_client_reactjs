import React from "react";
import { Link } from "react-router-dom";

// Import custom modules
import { CardSmall } from "./Card";

export default function RecruitmentCard({ link = "" }) {
  return (
    <CardSmall>
      <h1 className="font-bold text-xl">Dibutuhkan Chef Berpengalaman</h1>
      <h3 className="mb-4">Posisi: Chef</h3>

      <p className="description-3 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo reiciendis
        cum architecto ad ut expedita voluptate, blanditiis vitae, nostrum porro
        asperiores accusantium dicta quisquam labore, repudiandae laudantium
        dolore nemo cumque! Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Distinctio veniam alias ex dolor modi, illo voluptatum. Atque,
        blanditiis aspernatur earum, quibusdam, eum impedit omnis deserunt rem
        totam accusantium dolores perspiciatis!
      </p>

      <Link
        to={link}
        className="inline-block bg-yellow-500 text-back hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-sm font-bold mt-4 ml-auto">
        More
      </Link>
    </CardSmall>
  );
}
