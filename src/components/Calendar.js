import React from "react";
import time from "../utils/time";

export default function Calendar({ yearMonth, override = {} }) {
  if (!yearMonth) yearMonth = time.yearMonth(false, +1);
  const [year, month] = yearMonth.split("-");

  const date = new Date(year, Number(month), 1);
  const lastDate = new Date(year, Number(month), 0);
  const skipIndex = date.getDay();
  const lastIndex = lastDate.getDate();
  const remainIndex = 7 - lastDate.getDay();

  const dates = [];
  for (let i = 1; i < skipIndex - 2; i++) {
    dates.push({ value: "", label: "", className: "bg-gray-200" });
  }

  for (let i = 1; i <= lastIndex; i++) {
    let className = "";
    switch (dates.length) {
      case 6:
      case 13:
      case 20:
      case 27:
        className = "font-semibold text-red-500";
        break;

      default:
        break;
    }

    const data = override[i] ? override[i] : { value: i, label: i, className };

    dates.push(data);
  }

  for (let i = 1; i <= remainIndex; i++) {
    dates.push({ value: "", label: "", className: "bg-gray-200" });
  }

  return (
    <div className="border text-sm">
      <h1 className="border px-4 py-2 text-center font-bold text-md">
        September 2020
      </h1>
      <div className="grid grid-cols-7">
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Senin</label>
          <label className="md:hidden">Sn</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Selasa</label>
          <label className="md:hidden">Sl</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Rabu</label>
          <label className="md:hidden">Rb</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Kamis</label>
          <label className="md:hidden">Km</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Jum'at</label>
          <label className="md:hidden">Jm</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Sabtu</label>
          <label className="md:hidden">Sb</label>
        </span>
        <span className="border px-2 sm:px-4 py-2 text-center font-bold">
          <label className="hidden md:inline">Minggu</label>
          <label className="md:hidden">Mn</label>
        </span>
        {dates.map((date, index) => (
          <span
            key={index}
            className={`border px-2 sm:px-4 py-2 text-center ${date.className}`}>
            {date.label}
          </span>
        ))}
      </div>
    </div>
  );
}
