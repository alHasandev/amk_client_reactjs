import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getAttendances } from "../apis/attendances";
import { getEmployees } from "../apis/employees";
import time from "../utils/time";
import url from "../utils/url";
import { CardLarge, CardMini } from "./Card";
import Loader from "./Loader";

export default function AttendanceTableMonthly() {
  const [filter, setFilter] = useState({
    employee: "",
  });

  const [monthRange, setMonthRange] = useState({
    start: "",
    end: "",
  });

  const queryObject = {};

  if (filter.employee) queryObject.employee = filter.employee;

  if (monthRange.start && monthRange.end)
    queryObject.monthRange = `${monthRange.start}:${monthRange.end}`;

  const monthlyAttendances = useQuery(
    [
      "attendances",
      {
        endpoint: "monthly",
        params: queryObject,
      },
    ],
    getAttendances
  );

  const employees = useQuery(["employees"], getEmployees);

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
    setMonthRange({ ...monthRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => setMonthRange({ start: "", end: "" });

  if (monthlyAttendances.isLoading || employees.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-lg text-sm">
        <form className="flex flex-col lg:flex-row items-stretch lg:items-center">
          <input
            type="month"
            name="start"
            value={monthRange.start}
            onChange={changeDate}
            className="border px-2 py-2 rounded outline-none my-2 lg:my-0 lg:mr-4"
          />
          <input
            type="month"
            name="end"
            value={monthRange.end}
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
        </form>
      </CardMini>
      <CardLarge className="overflow-x-auto">
        <div className="flex mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0 md:mr-4">
            Tabel Kehadiran Bulanan
          </h1>
          <div className="ml-auto"></div>
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/attendances/print/monthly/?${url.queryString(queryObject)}`}
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
                <th className="border px-4 py-2 text-center">Bulan</th>
                <th className="border px-4 py-2 text-center">NIK</th>
                <th className="border px-4 py-2 text-left">Nama Karyawan</th>
                <th className="border px-4 py-2 text-center">Hadir</th>
                <th className="border px-4 py-2 text-center">Cuti/Izin</th>
                <th className="border px-4 py-2 text-center">Tidak Hadir</th>
                <th className="border px-4 py-2 text-center">Detail</th>
              </tr>
            </thead>
            <tbody>
              {monthlyAttendances.data
                .filter((attendance) => attendance.employee !== null)
                .map((attendance, index) => {
                  const employee = attendance.employee || {};
                  const user = employee.user || {};
                  // console.log("_id", attendance._id);
                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {time.getMonth(attendance.month)}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {user.nik}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {user.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {attendance.present}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {attendance.leave}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {attendance.absence}
                      </td>
                      <td className="border px-4 py-2 text-center whitespace-no-wrap">
                        <Link
                          to={`/admin/attendances/calendar/${attendance._id}/?backLink=/admin/attendances/monthly`}
                          className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 
                            py-1 px-2">
                          <i className="far fa-calendar-alt"></i>
                        </Link>
                        <Link
                          to={`/admin/attendances/table/${attendance._id}/?backLink=/admin/attendances/monthly`}
                          className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 
                            py-1 px-2 ml-4">
                          <i className="fas  fa-table"></i>
                        </Link>
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
