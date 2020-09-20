import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAttendances } from "../apis/attendances";
import { statusColors } from "../assets";
import time from "../utils/time";
import Calendar from "./Calendar";
import { CardMedium, CardMini } from "./Card";
import Loader from "./Loader";

const statusLabel = {
  absence: "Tidak Hadir",
  present: "Hadir",
  leave: "Cuti/Libur",
};

export default function AttendanceCalendar() {
  const params = useParams();
  const calendarQuery = useQuery(
    [
      "calendar",
      {
        endpoint: `calendar/${params.attendanceGroupId}`,
      },
    ],
    getAttendances
  );

  if (calendarQuery.isLoading) return <Loader />;
  console.log("monthly attendance", calendarQuery.data);
  const month = calendarQuery.data.month;
  const total = calendarQuery.data.total;
  const calendar = calendarQuery.data.calendar;
  const employee = calendarQuery.data.employee;

  const override = {};
  Object.keys(calendar).map((key) => {
    override[Number(key)] = {
      value: Number(key),
      label: Number(key),
      className: statusColors[calendar[key]],
    };
  });
  console.log(override);

  return (
    <>
      <CardMedium className="text-sm">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold text-yellow-600 mb-4 md:mb-0">
            Kalender Kehadiran
          </h1>
          <div className="ml-auto"></div>
          <a
            href={`${process.env.REACT_APP_SERVER_LINK}/attendances/print/?`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full mb-4">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left md:w-64">Bulan</th>
              <td className="border px-4 py-2 text-left">
                {time.getMonth(month)}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left md:w-64">Karyawan</th>
              <td className="border px-4 py-2 text-left">
                [{employee.user.nik}] {employee.user.name}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left md:w-64" rowSpan="2">
                Keterangan Status
              </th>
              <th className="border px-4 py-2 text-center">Hadir</th>
              <th className="border px-4 py-2 text-center">Izin/Cuti</th>
              <th className="border px-4 py-2 text-center">Tidak Hadir</th>
            </tr>
            <tr>
              <td className="border p-2 text-center">
                <span className={`px-4 py-1 ${statusColors["present"]}`}>
                  {total["present"]}
                </span>
              </td>
              <td className="border p-2 text-center">
                <span className={`px-4 py-1 ${statusColors["leave"]}`}>
                  {total["leave"]}
                </span>
              </td>
              <td className="border p-2 text-center">
                <span className={`px-4 py-1 ${statusColors["absence"]}`}>
                  {total["absence"]}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </CardMedium>
      <CardMedium>
        <Calendar override={override}></Calendar>
      </CardMedium>
    </>
  );
}
