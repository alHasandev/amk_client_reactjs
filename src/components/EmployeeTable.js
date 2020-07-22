import React from "react";
import { CardExtraLarge } from "./Card";
import { Link } from "react-router-dom";
import { profile as profileImage } from "../assets";

export default function EmployeeTable() {
  return (
    <CardExtraLarge className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 pb-4">NO.</th>
            <th className="py-2 px-4 pb-4">IMAGE</th>
            <th className="py-2 px-4 pb-4">NAME</th>
            <th className="py-2 px-4 pb-4">AGE</th>
            <th className="py-2 px-4 pb-4">BIRTH DAY</th>
            <th className="py-2 px-4 pb-4">POSITION</th>
            <th className="py-2 px-4 pb-4">LEVEL</th>
            <th className="py-2 px-4 pb-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border text-center">1</td>
            <td className="p-1 border text-center w-16">
              <div className="border-2 border-yellow-600 rounded bg-gray-200">
                <img src={profileImage} alt="profile" />
              </div>
            </td>
            <td className="py-2 px-4 border">Name</td>
            <td className="py-2 px-4 border text-center">16</td>
            <td className="py-2 px-4 border text-center">12/12/2020</td>
            <td className="py-2 px-4 border text-center">Chef Chief</td>
            <td className="py-2 px-4 border text-center">Dept. Head</td>

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
    </CardExtraLarge>
  );
}
