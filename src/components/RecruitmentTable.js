import React from "react";
import Card, { CardMini } from "./Card";
import Container from "../layout/Container";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getRecruitments, deleteRecruitment } from "../apis/recruitments";
import { localDate } from "../utils/time";
import { useState } from "react";

export default function RecruitmentTable() {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const [filter, setFilter] = useState({
    status: "",
  });

  const queryObject = {};
  if (filter.status) queryObject.status = filter.status;
  if (dateRange.start && dateRange.end) {
    queryObject.dateRange = `${dateRange.start}:${dateRange.end}`;
  }

  const recruitments = useQuery(
    [
      "recruitments",
      {
        params: {
          isActive: true,
          ...queryObject,
        },
      },
    ],
    getRecruitments
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => {
    ev.preventDefault();
    setDateRange({ start: "", end: "" });
  };

  console.log(recruitments.data);

  if (recruitments.isLoading) return <Loader />;

  const statusColors = {
    open: "text-white bg-green-500 hover:bg-green-700",
    pending: "text-black bg-yellow-400 hover:bg-yellow-600",
    close: "text-black bg-gray-200 hover:bg-gray-400",
  };

  return (
    <>
      <CardMini className="w-full text-sm">
        <form className="flex items-center">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none mr-4"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none mr-4"
          />
          <button
            type="reset"
            onClick={resetDate}
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none mr-4">
            Reset
          </button>
          <div className="ml-auto"></div>
          <select
            name="status"
            value={filter.status}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none ml-4">
            <option value="">Status Lowongan</option>
            <option value="pending">Ditunda</option>
            <option value="open">Dibuka</option>
            <option value="close">Ditutup</option>
          </select>
        </form>
      </CardMini>
      <Card className="overflow-x-auto">
        <div className="flex mb-4">
          <h1 className="font-bold text-xl text-yellow-600">
            Penerimaan Karyawan Baru
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/recruitments/create"
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm ml-4">
            Tambah Penerimaan
          </Link>
          <a
            target="_blank"
            href="http://localhost:5000/recruitments/print"
            rel="noopener noreferrer"
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm ml-4">
            Report
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-2 xl:px-4 border">NO.</th>
              <th className="py-2 px-2 xl:px-4 border">Posisi Deperlukan</th>
              <th className="py-2 px-2 xl:px-4 border">Diperlukan</th>
              <th className="py-2 px-2 xl:px-4 border">Pelamar</th>
              <th className="py-2 px-2 xl:px-4 border">Ditunda</th>
              <th className="py-2 px-2 xl:px-4 border">Diterima</th>
              <th className="py-2 px-2 xl:px-4 border">Direkrut</th>
              <th className="py-2 px-2 xl:px-4 border">Deadline</th>
              <th className="py-2 px-2 xl:px-4 border">Status</th>
              <th className="py-2 px-2 xl:px-4 border">Detail</th>
              <th className="py-2 px-2 xl:px-4 border">Operasi</th>
            </tr>
          </thead>
          <tbody>
            {recruitments.data &&
              recruitments.data.map((recruitment, index) => {
                const oneDayTime = 60 * 60 * 24 * 1000;
                const deadlineDate = new Date(recruitment.expiredAt);
                const overTime = new Date().getTime() - deadlineDate.getTime();
                console.log(overTime, oneDayTime);
                let candidateTotal =
                  recruitment.pending +
                  recruitment.accepted +
                  recruitment.rejected +
                  recruitment.hired;
                return (
                  <tr key={recruitment._id}>
                    <td className="py-2 px-2 xl:px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 xl:px-4 border">
                      {recruitment.positionName}
                    </td>
                    <td className="py-1 px-2 xl:px-4 border text-center">
                      {recruitment.numberRequired}
                    </td>
                    <td className="py-1 px-2 xl:px-4 border text-center">
                      {candidateTotal}
                    </td>
                    <td className="py-1 px-2 xl:px-4 border text-center">
                      {recruitment.pending}
                    </td>
                    <td className="py-1 px-2 xl:px-4 border text-center">
                      {recruitment.accepted}
                    </td>
                    <td className="py-1 px-2 xl:px-4 border text-center">
                      {recruitment.hired}
                    </td>
                    <td className="py-2 px-2 xl:px-4 border text-center">
                      <span
                        className={
                          overTime > oneDayTime
                            ? "bg-red-500 px-2 py-1 text-white"
                            : ""
                        }>
                        {localDate(deadlineDate)}
                      </span>
                    </td>
                    <td className="py-2 px-2 xl:px-4 border text-center">
                      <div
                        to="/candidates"
                        className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                          statusColors[recruitment.status]
                        }`}>
                        {recruitment.status}
                      </div>
                    </td>
                    <td className="py-2 px-2 xl:px-4 border text-center">
                      <Link
                        to={`/admin/recruitments/${recruitment._id}`}
                        className="inline-block rounded font-bold bg-blue-500 hover:bg-blue-600 text-white py-1 px-2">
                        <i className="fas fa-search"></i>
                      </Link>
                    </td>
                    <td className="py-2 px-2 xl:px-4 border text-center whitespace-no-wrap">
                      <Link
                        to={`/admin/recruitments/edit/${recruitment._id}`}
                        className="inline-block rounded font-bold bg-green-500 hover:bg-green-600 text-white py-1 px-2 md:mr-2">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        onClick={async (ev) => {
                          if (
                            window.confirm(
                              "Apakah anda yakin akan menghapus recruitment ini ?"
                            )
                          ) {
                            if (
                              await deleteRecruitment({
                                endpoint: "soft/" + recruitment._id,
                              })
                            ) {
                              alert("Berhasil menghapus recruitment!");
                            } else {
                              alert("Gagal menghapus recruitment!");
                            }
                          }
                        }}
                        className="inline-block rounded font-bold bg-red-500 hover:bg-red-600 text-white py-1 px-2">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
