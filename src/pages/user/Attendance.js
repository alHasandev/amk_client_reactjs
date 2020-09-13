import React, { useState } from "react";
import Calendar from "react-calendar";
import { CardMini, CardSmall } from "../../components/Card";

import time, { normalDate, reverseNormalDate } from "../../utils/time";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { getEmployees } from "../../apis/employees";
import { getAttendances } from "../../apis/attendances";
import url from "../../utils/url";

const statusLabel = {
  absence: "Tidak Hadir",
  present: "Hadir",
  leave: "Cuti/Libur",
};
const tileClassNames = ["focus:outline-none py-2 border hover:bg-gray-200"];

const PrevLabel = () => (
  <div className="px-2 md:px-4 py-2 hover:bg-gray-200 outline-none">
    <i className="fas fa-angle-left" />
  </div>
);
const Prev2Label = () => (
  <div className="px-2 md:px-4 py-2 hover:bg-gray-200 outline-none">
    <i className="fas fa-angle-double-left"></i>
  </div>
);

const NextLabel = () => (
  <div className="px-2 md:px-4 py-2 hover:bg-gray-200 outline-none">
    <i className="fas fa-angle-right" />
  </div>
);
const Next2Label = () => (
  <div className="px-2 md:px-4 py-2 hover:bg-gray-200 outline-none">
    <i className="fas fa-angle-double-right"></i>
  </div>
);

export default function UserAttendance() {
  const [selectedMonth, setSelectedMonth] = useState(
    time.yearMonth(new Date(), 1)
  );

  const employee = useQuery(
    [
      "employee",
      {
        endpoint: "me",
      },
    ],
    getEmployees
  );

  const employeeId = employee.data ? employee.data._id : null;

  const attendances = useQuery(
    [
      "attendances",
      {
        params: {
          month: selectedMonth,
          employee: employeeId,
        },
      },
    ],
    getAttendances
  );

  const queryFilter = {};
  if (employeeId) queryFilter.employee = employeeId;
  if (selectedMonth) queryFilter.month = selectedMonth;

  console.log(attendances);

  if (employee.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-sm text-sm">
        <div className="flex items-center">
          <div className="ml-auto"></div>
          <Link
            to={`/user/attendances/scanqr`}
            className="inline-block whitespace-no-wrap bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-1 rounded-sm ml-4">
            Scan QR Kehadiran
          </Link>
        </div>
      </CardMini>
      <CardSmall>
        <div className="flex justify-end mb-4">
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/attendances/print/calendar?${url.queryString(queryFilter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <Calendar
          value={new Date()}
          className="text-center mx-auto cursor-pointer border border-gray-500 rounded p-2"
          showNeighboringMonth={false}
          prevLabel={<PrevLabel />}
          prev2Label={<Prev2Label />}
          nextLabel={<NextLabel />}
          next2Label={<Next2Label />}
          tileClassName={({ date, view }) => {
            let markStyle = "";
            const attendance =
              attendances.data &&
              attendances.data.find(
                (attendance) => normalDate(attendance.date) === normalDate(date)
              );

            if (view === "month" && attendance) {
              switch (attendance.status) {
                case "absence":
                  markStyle = "bg-red-500 text-white";
                  break;
                case "present":
                  markStyle = "bg-green-500 text-white";
                  break;
                case "leave":
                  markStyle = "bg-yellow-600 text-white";
                  break;

                default:
                  break;
              }

              return [...tileClassNames, markStyle];
            }

            if (view === "month" && date.getDay() === 0)
              return [...tileClassNames, "text-red-500"];
            return tileClassNames;
          }}
        />
      </CardSmall>
      <CardSmall className="flex flex-wrap">
        <div className="mr-4 flex items-center">
          <span className="inline-block mr-2 p-2 bg-red-500"></span>
          <span>Tidak Hadir</span>
        </div>
        <div className="mr-4 flex items-center">
          <span className="inline-block mr-2 p-2 bg-green-500"></span>
          <span>Hadir</span>
        </div>
        <div className="mr-4 flex items-center">
          <span className="inline-block mr-2 p-2 bg-yellow-600"></span>
          <span>Cuti/Libur</span>
        </div>
      </CardSmall>
      <CardSmall className="overflow-hidden">
        <div className="flex items-center mb-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(ev) => setSelectedMonth(ev.target.value)}
            className="bg-gray-200 text-sm rounded-sm px-4 py-1 focus:outline-none"
          />
          <div className="ml-auto"></div>
          <a
            target="_blank"
            href={`${process.env.REACT_APP_SERVER_LINK}/attendances/print/${employee.data._id}`}
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border px-2 md:px-4 py-2">Tanggal</th>
                <th className="border px-2 md:px-4 py-2">Hari</th>
                <th className="border px-2 md:px-4 py-2">Status</th>
                <th className="border px-2 md:px-4 py-2">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {attendances.data &&
                attendances.data
                  .filter(
                    (attendance) =>
                      time.yearMonth(attendance.date, 1) === selectedMonth
                  )
                  .map((attendance) => (
                    <tr key={attendance.date}>
                      <td className="border px-2 md:px-4 py-2 text-center whitespace-no-wrap">
                        {reverseNormalDate(attendance.date)}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-center">
                        {time.getDayName(attendance.date)}
                      </td>
                      <td className="border px-2 md:px-4 py-2 text-center">
                        {statusLabel[attendance.status]}
                      </td>
                      <td className="border px-2 md:px-4 py-2">
                        {attendance.dayLeave && `${attendance.dayLeave} Hari, `}
                        {attendance.description}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </CardSmall>
    </>
  );
}
