import React from "react";

export function ChooseOne({ name, choices = [], value, onChange }) {
  return (
    <div className="inline-block border border-gray-500 rounded overflow-hidden">
      {choices.map((choice, index) => (
        <div key={index} className="inline-block">
          <input
            type="radio"
            name={name}
            id={`${choice.value}`}
            value={choice.value}
            onChange={onChange}
            className="hidden"
          />
          <label
            htmlFor={`${choice.value}`}
            className={`inline-block cursor-pointer px-4 py-2 shadow-sm font-semibold text-sm ${
              value === choice.value ? choice.activeClassName : choice.className
            }`}>
            {choice.label}
          </label>
        </div>
      ))}
    </div>
  );
}
