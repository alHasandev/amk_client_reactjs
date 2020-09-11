import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { CardSmall } from "../../components/Card";

import time, { normalDate, reverseNormalDate } from "../../utils/time";
import { useQuery } from "react-query";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getEmployee, getEmployees } from "../../apis/employees";
import { printScreen } from "../../utils/print";

const getAttendances = async (key, employeeId) => {
  if (!employeeId) return [];
  try {
    const res = await Axios.get(`/attendances/${employeeId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const statusLabel = {
  absence: "Tidak Hadir",
  present: "Hadir",
  leave: "Cuti/Libur",
};
const tileClassNames = ["focus:outline-none py-2 border hover:bg-gray-200"];

const PrevLabel = () => <></>;
const Prev2Label = () => <></>;

const NextLabel = () => <></>;
const Next2Label = () => <></>;

export default function Attendance() {
  const { employeeId } = useParams();

  const employee = useQuery(
    [
      "employee",
      {
        endpoint: employeeId,
      },
    ],
    getEmployees
  );
  const attendances = useQuery(["attendances", employeeId], getAttendances);
  // console.log(attendances);
  console.log(employee);
  useEffect(() => {
    if (attendances.data && employee.data) {
      printScreen().then((close) => close());
    }
  }, [attendances.data, employee.data]);

  if (attendances.isLoading || employee.isLoading) return <Loader />;

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">
        Laporan Kehadiran {employee.data.user.name} Bulan Ini
      </h1>
      <CardSmall className="mb-4">
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
    </>
  );
}
