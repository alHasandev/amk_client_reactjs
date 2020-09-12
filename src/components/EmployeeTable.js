import React, { useEffect, useState } from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { Link } from "react-router-dom";
import { profile as profileImage } from "../assets";
import Loader from "./Loader";

import time, { calculateAge, localDate } from "../utils/time";
import { useQuery } from "react-query";
import { getEmployees, deleteEmployee } from "../apis/employees";
import { IDR } from "../utils/currency";
import { getDepartments } from "../apis/departments";
import { getPositions } from "../apis/positions";
import url from "../utils/url";

export default function EmployeeTable() {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const [filter, setFilter] = useState({
    department: "",
    position: "",
  });

  const queryObject = {};
  if (filter.department) queryObject.department = filter.department;
  if (filter.position) queryObject.position = filter.position;
  if (dateRange.start && dateRange.end) {
    queryObject.dateRange = `${dateRange.start}:${dateRange.end}`;
  }

  const departments = useQuery(["departments"], getDepartments);
  const [positions, setPositions] = useState([]);

  const employees = useQuery(
    [
      "employees",
      {
        params: {
          isActive: true,
          ...queryObject,
        },
      },
    ],
    getEmployees
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => {
    ev.preventDefault();
    setDateRange({ start: "", end: "" });
  };

  useEffect(() => {
    setFilter({ ...filter, position: "" });
    if (filter.department) {
      getPositions("position", {
        params: {
          department: filter.department,
        },
      }).then((data) => {
        setPositions(data);
      });
    }
  }, [filter.department]);

  if (employees.isLoading) return <Loader />;
  if (employees.isError) {
    console.log("error", employees.error);
    return <></>;
  }

  console.log(employees.data);

  return (
    <>
      <CardMini className="w-full text-sm">
        <form className="flex flex-col lg:flex-row items-stretch lg:items-center">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none my-2 lg:my-0 lg:mr-4"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none my-2 lg:my-0 lg:mr-4"
          />
          <button
            type="reset"
            onClick={resetDate}
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none my-2 lg:my-0 lg:mr-4">
            Resets
          </button>
          <div className="ml-auto"></div>
          <select
            name="position"
            value={filter.position}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none my-2 lg:my-0 lg:ml-4">
            <option value="">
              {filter.department ? "Semua Jabatan" : "Pilih Departemen Dulu"}
            </option>
            {positions &&
              positions.map((position) => (
                <option key={position._id} value={position._id}>
                  [{position.code}] {position.name}
                </option>
              ))}
          </select>
          <select
            name="department"
            value={filter.department}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none my-2 lg:my-0 lg:ml-4">
            <option value="">Semua Departemen</option>
            {departments.data &&
              departments.data.map((department) => (
                <option key={department._id} value={department._id}>
                  [{department.code}] {department.name}
                </option>
              ))}
          </select>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Karyawan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/employees/create"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Tambah Karyawan
          </Link>
          <a
            href={`http://localhost:5000/employees/print?${url.queryString(
              queryObject
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border py-2 px-4">NO.</th>
                <th className="border py-2 px-4">Foto</th>
                <th className="border py-2 px-4">Nama</th>
                <th className="border py-2 px-4">Umur</th>
                <th className="border py-2 px-4">Tanggal Bergabung</th>
                <th className="border py-2 px-4">Jabatan/Posisi</th>
                <th className="border py-2 px-4">Departemen</th>
                <th className="border py-2 px-4">Gaji Pokok</th>
                <th className="border py-2 px-4">Detail</th>
                <th className="border py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.data &&
                employees.data.map((employee, index) => (
                  <tr key={employee._id}>
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
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
                      {time.getDateString(employee.joinDate)}
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

                    <td className="py-2 px-4 border text-center">
                      <Link
                        to={`/admin/employees/${employee._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                        <i className="fas fa-search"></i>
                      </Link>
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
        </div>
      </CardExtraLarge>
    </>
  );
}
