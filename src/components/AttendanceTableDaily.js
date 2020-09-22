import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Select from "react-select";

import { deleteAttendance, getAttendances } from "../apis/attendances";
import { getEmployees } from "../apis/employees";
import { statusColors, statusLabels } from "../assets";
import { reverseNormalDate } from "../utils/time";
import url from "../utils/url";
import { CardLarge, CardMini } from "./Card";
import Loader from "./Loader";

export default function AttendanceTableDaily() {
  const [filter, setFilter] = useState({
    employee: "",
    status: "",
  });

  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const queryObject = {};

  if (filter.employee) queryObject.employee = filter.employee;
  if (filter.status) queryObject.status = filter.status;

  if (dateRange.start && dateRange.end)
    queryObject.dateRange = `${dateRange.start}:${dateRange.end}`;

  const attendances = useQuery(
    [
      "attendances",
      {
        params: queryObject,
      },
    ],
    getAttendances
  );

  const employees = useQuery(["employees"], getEmployees);

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });
  const changeEmployee = (select) =>
    setFilter((filter) => {
      console.log(select);
      if (select && select.value) {
        return { ...filter, employee: select.value };
      } else {
        return { ...filter, employee: null };
      }
    });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => setDateRange({ start: "", end: "" });

  if (attendances.isLoading || employees.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-lg text-sm">
        <form className="flex flex-col lg:flex-row items-stretch lg:items-center">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={changeDate}
            className="border px-2 py-2 rounded outline-none my-2 lg:my-0 lg:mr-4"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={changeDate}
            className="border px-2 py-2 rounded outline-none my-2 lg:my-0 lg:mr-4"
          />
          <button
            type="reset"
            onClick={resetDate}
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-2 rounded-sm focus:outline-none my-2 lg:my-0 lg:mr-4">
            Reset
          </button>
          <div className="ml-auto"></div>
          <Select
            name="employee"
            placeholder="Semua Karyawan"
            value={(() => {
              if (filter.employee) {
                const employee = employees.data.find(
                  (employee) => employee._id === filter.employee
                );
                return {
                  value: employee._id,
                  label: `[${employee.user.nik}] ${employee.user.name}`,
                };
              } else {
                return null;
              }
            })()}
            onChange={changeEmployee}
            className="border rounded outline-none w-full my-2 lg:my-0 lg:ml-4"
            isClearable={true}
            options={employees.data.map((employee) => ({
              value: employee._id,
              label: `[${employee.user.nik}] ${employee.user.name}`,
            }))}
          />
          <select
            name="status"
            value={filter.status}
            onChange={changeFilter}
            className="border px-2 py-2 rounded outline-none my-2 lg:my-0 lg:ml-4">
            <option value="">Semua Status</option>
            <option value="present">Hadir</option>
            <option value="leave">Cuti/Izin</option>
            <option value="absence">Tidak Hadir</option>
          </select>
        </form>
      </CardMini>
      <CardLarge className="overflow-x-auto">
        <div className="flex flex-col md:flex-row items-stretch text-center md:items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0 md:mr-4">
            Tabel Kehadiran Harian
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/attendances/create/?backLink=/admin/attendances/daily"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 mb-4 md:mb-0 md:ml-4">
            Tambah Kehadiran
          </Link>
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/attendances/print?${url.queryString(queryObject)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm 
            shadow-sm mb-4 md:mb-0 md:ml-4">
            Cetak
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">NO.</th>
                <th className="border px-4 py-2 text-center">Tanggal</th>
                <th className="border px-4 py-2 text-center">NIK</th>
                <th className="border px-4 py-2 text-left">Nama Karyawan</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-left">Keterangan</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendances.data &&
                attendances.data
                  .filter((attendance) => attendance.employee !== null)
                  .map((attendance, index) => {
                    const employee = attendance.employee || {};
                    const user = employee.user || {};

                    return (
                      <tr key={attendance._id}>
                        <td className="border px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border px-4 py-2 text-center whitespace-no-wrap">
                          {reverseNormalDate(attendance.date)}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {user.nik}
                        </td>
                        <td className="border px-4 py-2 text-left">
                          {user.name}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-sm text-xs ${
                              statusColors[attendance.status]
                            }`}>
                            {statusLabels[attendance.status]}
                          </span>
                        </td>
                        <td className="border px-4 py-2 text-left">
                          {attendance.description}
                        </td>
                        <td className="border px-4 py-2 text-center whitespace-no-wrap">
                          <Link
                            to={`/admin/attendances/edit/${attendance._id}`}
                            className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 
                            py-1 px-2">
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={async (e) => {
                              if (
                                window.confirm(
                                  "Apakah anda yakin akan menghapus absensi ?"
                                )
                              ) {
                                if (
                                  await deleteAttendance({
                                    endpoint: `${attendance._id}`,
                                  })
                                ) {
                                  await attendances.refetch();
                                  alert("Abensi berhasil dihapus !");
                                } else {
                                  alert("Gagal menghapus absensi");
                                }
                              }
                            }}
                            className="inline-block rounded font-bold text-white bg-red-500 hover:bg-red-600 
                            py-1 px-2 ml-2">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </CardLarge>
    </>
  );
}
