import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import { CardLarge, CardMini } from "./Card";
import time from "../utils/time";
import { Link } from "react-router-dom";
import { getRequests } from "../apis/requests";
import { getEmployees } from "../apis/employees";
import { statusColors } from "../assets";

export default function UserRequestTable() {
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
        endpoint: "me",
        params: {
          ...queryObject,
        },
      },
    ],
    getRequests
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

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => {
    ev.preventDefault();
    setDateRange({ start: "", end: "" });
  };

  if (requests.isLoading || employee.isLoading) return <Loader />;

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
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none my-2 lg:my-0 lg:mr-4">
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
      <CardLarge>
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Permintaan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/user/requests/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Permintaan
          </Link>
          <a
            href={`http://localhost:5000/requests/print/employee/${employee.data._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="border px-4 py-2">NO.</th>
              <th className="border px-4 py-2">Tanggal</th>
              <th className="border px-4 py-2 text-left">Detail Permintaan</th>
              <th className="border px-4 py-2 text-left">Komentar</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Detail</th>
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
                  <td className="border px-4 py-2 font-bold md:font-normal whitespace-no-wrap text-center">
                    {time.getDateString(request.createdAt)}
                  </td>
                  <td className="border px-4 py-2">{request.message}</td>
                  <td className="border px-4 py-2">{request.comment}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded uppercase font-semibold text-xs text-center ${
                        statusColors[request.status]
                      }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link
                      to={`/user/requests/${request._id}/?backLink=/user/requests`}
                      className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2">
                      <i className="fas fa-search"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardLarge>
    </>
  );
}
