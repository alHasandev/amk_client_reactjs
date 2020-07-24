// Import modules
import React from "react";
import { Link, useParams } from "react-router-dom";

// Import custom hooks
import { useAxiosGet } from "../hooks/request";

// Import components
import { CardLarge } from "./Card";
import Loader from "./Loader";
import Error from "./Error";

// Import utilites function
import { IDR } from "../utils/currency";

export default function PositionTable() {
  const params = useParams();
  const [positions, isLoading, error] = useAxiosGet(
    `/departments/${params.id}/positions`
  );

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!positions) return <h1>Not found!</h1>;

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
          {positions.map((position, index) => (
            <tr key={position._id}>
              <td className="py-2 px-4 border text-center">{index + 1}</td>
              <td className="py-2 px-4 border text-center">{position.code}</td>
              <td className="py-2 px-4 border">{position.name}</td>
              <td className="py-2 px-4 border text-center">{position.level}</td>
              <td className="py-1 px-4 border text-right">
                {IDR(position.salary)}
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
        </tbody>
      </table>
    </CardLarge>
  );
}
