import React from "react";

export default function Error({ error }) {
  return (
    <div className="flex items-center flex-col md:flex-row bg-white px-4 md:px-16 py-8 md:py-4 rounded-sm shadow-md mx-auto font-semibold">
      <span className="flex justify-center items-center border-4 border-red-600 rounded-full w-12 h-12 mb-4 md:mr-4 md:mb-0">
        <i className="fas fa-exclamation text-red-600 text-2xl"></i>
      </span>
      <h1 className="text-xl">{error.message}</h1>
    </div>
  );
}
