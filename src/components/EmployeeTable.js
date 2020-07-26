import React from "react";
import { CardExtraLarge } from "./Card";
import { Link } from "react-router-dom";
import { profile as profileImage } from "../assets";
import { useAxiosGet } from "../hooks/request";
import Error from "./Error";
import Loader from "./Loader";

import { calculateAge, localDate } from "../utils/time";

export default function EmployeeTable() {
  const [employees, isLoading, error] = useAxiosGet("/employees");

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!employees) return <Error error={{ message: "Employees not found!" }} />;

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
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="py-2 px-4 border text-center">{index + 1}</td>
              <td className="p-1 border text-center w-16">
                <div className="border-2 border-yellow-600 rounded bg-gray-200">
                  <img src={profileImage} alt="profile" />
                </div>
              </td>
              <td className="py-2 px-4 border">{employee.name}</td>
              <td className="py-2 px-4 border text-center">
                {calculateAge(new Date(employee.birthDate))}
              </td>
              <td className="py-2 px-4 border text-center">
                {localDate(employee.birthDate)}
              </td>
              <td className="py-2 px-4 border text-center">
                {employee.position.name}
              </td>
              <td className="py-2 px-4 border text-center">
                {employee.position.level}
              </td>

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
          ))}
          {employees.length === 0 && (
            <tr className="text-center">
              <td className="py-2 px-4 border">0</td>
              <td className="py-2 px-4 border" colSpan="6">
                No Data
              </td>
              <td className="py-2 px-4 border"></td>
            </tr>
          )}
        </tbody>
      </table>
    </CardExtraLarge>
  );
}
