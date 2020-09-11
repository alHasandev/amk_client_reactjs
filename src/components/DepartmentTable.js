import React from "react";
import { CardLarge } from "./Card";
import { Link, useParams } from "react-router-dom";
import { useAxiosGet } from "../hooks/request";
import Error from "./Error";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getDepartments, deleteDepartment } from "../apis/departments";

export default function DepartmentTable() {
  // const params = useParams();
  const params = useParams();
  // const [departments, isLoading, error] = useAxiosGet(
  //   `/departments/${params.id || ""}`
  // );

  const departments = useQuery(
    [
      "departments",
      {
        params: { _id: params.departmentId, isActive: true },
      },
    ],
    getDepartments
  );

  if (departments.isLoading) return <Loader />;
  if (!departments.data)
    return <Error error={{ message: "Departments not found!" }} />;

  return (
    <>
      <CardLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Department
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/departments/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Department
          </Link>
          <a
            href="http://localhost:5000/departments/print"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 ml-4">
            Report
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border">NO.</th>
              <th className="py-2 px-4 border">CODE</th>
              <th className="py-2 px-4 border">NAME</th>
              <th className="py-2 px-4 border">POSITIONS</th>
              <th className="py-2 px-4 border">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {departments.data &&
              departments.data.map((department, index) => (
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
                      to={`/admin/departments/edit/${department._id}`}
                      className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={async (ev) => {
                        if (
                          window.confirm(
                            `Apakah anda yakin akan menghapus department: ${department.name} ?`
                          )
                        ) {
                          try {
                            await deleteDepartment({
                              endpoint: "soft/" + department._id,
                            });
                            await departments.refetch();
                            alert(
                              `Berhasil menghapus department: ${department.name}`
                            );
                          } catch (err) {
                            alert(
                              `Gagal menghapus department: ${department.name}`
                            );
                          }
                        }
                      }}
                      className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardLarge>
    </>
  );
}
