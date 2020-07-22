import React from "react";
import { CardLarge } from "./Card";
import { Link } from "react-router-dom";

export default function PositionTable() {
  return (
    <CardLarge className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 pb-4">NO.</th>
            <th className="py-2 px-4 pb-4">CODE</th>
            <th className="py-2 px-4 pb-4">NAME</th>
            <th className="py-2 px-4 pb-4">LEVEL</th>
            <th className="py-2 px-4 pb-4">PAY</th>
            <th className="py-2 px-4 pb-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border text-center">1</td>
            <td className="py-2 px-4 border">Code</td>
            <td className="py-2 px-4 border">Position Name</td>
            <td className="py-2 px-4 border text-center">
              [Dept. Head, Staff, Trainee, Intern]
            </td>
            <td className="py-1 px-4 border">Rp. 2.700.000, 00</td>
            <td className="py-1 px-4 border text-center">
              <Link
                to="/candidates"
                className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                <i className="fas fa-edit"></i>
              </Link>
              <Link
                to="/candidates"
                className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                <i className="fas fa-trash-alt"></i>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </CardLarge>
  );
}
