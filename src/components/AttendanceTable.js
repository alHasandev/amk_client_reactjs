import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { deleteAttendance, getAttendances } from "../apis/attendances";
import { statusColors, statusLabels } from "../assets";
import time from "../utils/time";
import { CardMedium } from "./Card";
import Loader from "./Loader";

export default function AttendanceTable() {
  const params = useParams();
  const [year, month, employeeId] = params.attendanceGroupId.split("-");
  const attendances = useQuery(
    [
      "attendances",
      {
        params: {
          month: `${year}-${month}`,
          employee: employeeId,
        },
      },
    ],
    getAttendances
  );

  if (attendances.isLoading) return <Loader />;
  const employee = attendances.data[0].employee || {};
  const user = employee.user || {};
  const total = {
    present: 0,
    leave: 0,
    absence: 0,
  };

  attendances.data.map((attendance, index) => {
    console.log(index + " attendance status", attendance.status);
    total[attendance.status] += 1;
  });

  return (
    <>
      <CardMedium className="text-sm">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold text-yellow-600 mb-4 md:mb-0">
            Detail Kehadiran Bulanan
          </h1>
          <div className="ml-auto"></div>
          <a
            href={`${process.env.REACT_APP_SERVER_LINK}/attendances/print/monthly/${params.attendanceGroupId}`}
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
                {time.getMonth([year, month])}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left md:w-64">Karyawan</th>
              <td className="border px-4 py-2 text-left">
                [{user.nik}] {user.name}
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
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-center">NO.</th>
              <th className="border px-4 py-2 text-center">Hari</th>
              <th className="border px-4 py-2 text-center">Tgl</th>
              <th className="border px-4 py-2 text-center">Status</th>
              <th className="border px-4 py-2 text-center">Keterangan</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {attendances.data.map((attendance, index) => {
              return (
                <tr key={attendance._id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center uppercase">
                    {time.getDayName(attendance.date)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {time.date(attendance.date)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-sm ${
                        statusColors[attendance.status]
                      }`}>
                      {statusLabels[attendance.status]}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {attendance.description}
                  </td>
                  <td className="border px-4 py-2 text-center whitespace-no-wrap">
                    <Link
                      to={`/admin/attendances/edit/${attendance._id}/?backLink=/admin/attendances/table/${params.attendanceGroupId}`}
                      className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 
                            py-1 px-2">
                      <i className="far fa-edit"></i>
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
      </CardMedium>
    </>
  );
}
