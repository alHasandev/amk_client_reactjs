import React from "react";

// Import static assets
import { banner } from "../assets";

export default function Background({ children = "", className = "", ...rest }) {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center bg-fixed bg-yellow-900"
      style={{ backgroundImage: `url(${banner})` }}
      alt="">
      <div
        className={`bg-black bg-opacity-75 min-h-screen pt-20 pb-8 ${className}`}
        {...rest}>
        {children}
      </div>
    </div>
  );
}
