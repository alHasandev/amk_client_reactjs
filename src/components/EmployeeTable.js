import React from "react";
import { CardExtraLarge } from "./Card";
import { Link } from "react-router-dom";
import { profile as profileImage } from "../assets";
import Loader from "./Loader";

import { calculateAge, localDate } from "../utils/time";
import { useQuery } from "react-query";
import { getEmployees, deleteEmployee } from "../apis/employees";
import { IDR } from "../utils/currency";

export default function EmployeeTable() {
  const employees = useQuery(
    [
      "employees",
      {
        params: {
          isActive: true,
        },
      },
    ],
    getEmployees
  );

  if (employees.isLoading) return <Loader />;
  if (employees.isError) {
    console.log("error", employees.error);
    return <></>;
  }

  console.log(employees.data);

  return (
    <CardExtraLarge className="overflow-x-auto">
      <div className="md:flex items-center mb-4">
        <h1 className="font-bold text-xl text-yellow-600">Tabel Karyawan</h1>
        <div className="ml-auto"></div>
        <Link
          to="/admin/employees/create"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
          Tambah Karyawan
        </Link>
        <a
          href="http://localhost:5000/employees/print?"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Report
        </a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border py-2 px-4">NO.</th>
            <th className="border py-2 px-4">Foto</th>
            <th className="border py-2 px-4">Nama</th>
            <th className="border py-2 px-4">Umur</th>
            <th className="border py-2 px-4">Tanggal Lahir</th>
            <th className="border py-2 px-4">Jabatan/Posisi</th>
            <th className="border py-2 px-4">Departemen</th>
            <th className="border py-2 px-4">Gaji Pokok</th>
            <th className="border py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.data &&
            employees.data.map((employee, index) => (
              <tr key={employee._id}>
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="p-1 border text-center w-16">
                  <div className="border-2 border-yellow-600 rounded bg-gray-200">
                    <img src={employee.user.image} alt="profile" />
                  </div>
                </td>
                <td className="py-2 px-4 border">{employee.user.name}</td>
                <td className="py-2 px-4 border text-center">
                  {calculateAge(new Date(employee.user.profile.birthDate))}
                </td>
                <td className="py-2 px-4 border text-center">
                  {localDate(employee.user.profile.birthDate)}
                </td>
                <td className="py-2 px-4 border text-center">
                  [{employee.position.code}] {employee.position.name}
                </td>
                <td className="py-2 px-4 border text-center">
                  [{employee.department.code}] {employee.department.name}
                </td>
                <td className="py-2 px-4 border text-center">
                  {IDR(employee.position.salary)}
                </td>

                <td className="py-1 px-4 border text-center whitespace-no-wrap">
                  <Link
                    to={`/admin/employees/edit/${employee._id}`}
                    className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={async (ev) => {
                      if (
                        window.confirm(
                          `Apakah anda yakin akan menghapus karyawan: ${employee.user.name} ?`
                        )
                      ) {
                        if (
                          await deleteEmployee({
                            endpoint: employee._id,
                          })
                        ) {
                          await employees.refetch();
                          alert("Berhasil menghapus karyawan!");
                        } else {
                          alert("Gagal menghapus karyawan!");
                        }
                      }
                    }}
                    className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                    <i className="fas fa-trash-alt"></i>
                  </button>
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
