import React from "react";
import { CardLarge } from "./Card";
import { Link, useParams } from "react-router-dom";
import { useAxiosGet } from "../hooks/request";
import Error from "./Error";
import Loader from "./Loader";

export default function DepartmentTable() {
  const params = useParams();
  console.log(params);
  const [departments, isLoading, error] = useAxiosGet(
    `/departments/${params.id ? params.id : ""}`
  );

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!departments) return <h1>Not Data !</h1>;

  return (
    <>
      <div className="bg-white px-4 py-2 rounded-sm shadow-md">
        <form action="">
          <div className="flex items-center">
            <Link to="/admin/departments" className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="px-4 py-1 bg-gray-200 focus:outline-none rounded-sm w-full"
            />
            <Link
              to={`/admin/departments${
                params.id ? `/${params.id}` : ""
              }/create`}
              className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm ml-4">
              {params.id ? "New Position" : "New Department"}
            </Link>
          </div>
        </form>
      </div>
      <CardLarge className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 pb-4">NO.</th>
              <th className="py-2 px-4 pb-4">CODE</th>
              <th className="py-2 px-4 pb-4">NAME</th>
              <th className="py-2 px-4 pb-4">POSITIONS</th>
              <th className="py-2 px-4 pb-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {(params.id ? [departments] : departments).map(
              (department, index) => (
                <tr key={department._id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {department.code}
                  </td>
                  <td className="py-2 px-4 border">{department.name}</td>
                  <td className="py-1 px-4 border text-center">
                    <Link
                      to={`/admin/departments/${department._id}`}
                      className="rounded font-bold bg-yellow-400 hover:bg-yellow-600 hover:text-white py-1 px-2">
                      {department.positions.length}
                    </Link>
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
              )
            )}
          </tbody>
        </table>
      </CardLarge>
    </>
  );
}
