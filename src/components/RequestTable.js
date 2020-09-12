import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import { CardExtraLarge, CardMini } from "./Card";
import time from "../utils/time";
import { Link } from "react-router-dom";
import { getRequests, deleteRequest } from "../apis/requests";
import { statusColors } from "../assets";
import url from "../utils/url";

export default function RequestTable() {
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

  const requests = useQuery(
    [
      "requests",
      {
        params: {
          ...queryObject,
        },
      },
    ],
    getRequests
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => {
    ev.preventDefault();
    setDateRange({ start: "", end: "" });
  };

  if (requests.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-lg text-sm">
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
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white 
            font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none my-2 lg:my-0 lg:mr-4">
            Resets
          </button>
          <div className="ml-auto"></div>
          <select
            name="status"
            value={filter.status}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none my-2 lg:my-0 lg:ml-4">
            <option value="">Status Permintaan</option>
            <option value="pending">Ditunda</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Permintaan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/requests/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Permintaan
          </Link>
          <a
            href={`http://localhost:5000/requests/print/?${url.queryString(
              queryObject
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm font-semibold
           shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="border px-4 py-2">NO.</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2 text-left">Dari</th>
                <th className="border px-4 py-2 text-left">
                  Detail Permintaan
                </th>
                <th className="border px-4 py-2 text-left">Komentar</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Detail</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {requests.data &&
                requests.data.map((request, index) => (
                  <tr
                    key={request._id}
                    className="grid mb-4 md:mb-0 md:table-row">
                    <td className="border px-4 py-2 text-center hidden md:table-cell">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 font-bold md:font-normal text-center">
                      {time.getDateString(request.createdAt)}
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      {request.from
                        ? `[${request.from.position.code}] ${request.from.user.name}`
                        : "NULL"}
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      {request.message}
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      {request.comment}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded uppercase font-semibold text-xs text-center ${
                          statusColors[request.status]
                        }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <Link
                        to={`/admin/requests/${request._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 
                        py-1 px-2">
                        <i className="fas fa-search"></i>
                      </Link>
                    </td>
                    <td className="border px-4 py-2 text-center whitespace-no-wrap">
                      <Link
                        to={`/admin/requests/edit/${request._id}`}
                        className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 
                        py-1 px-2 focus:outline-none">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        onClick={async (ev) => {
                          if (
                            window.confirm(
                              "Apakah anda yakin akan menghapus request ?"
                            )
                          ) {
                            if (await deleteRequest(request._id)) {
                              await requests.refetch();
                              alert("Berhasil menghapus request!");
                            } else {
                              alert("Gagal menghapus request!");
                            }
                          }
                        }}
                        className="inline-block rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 
                        px-2 focus:outline-none ml-2">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardExtraLarge>
    </>
  );
}
