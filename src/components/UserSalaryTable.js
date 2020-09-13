import React from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import time from "../utils/time";
import { useQuery } from "react-query";
import { getEmployees } from "../apis/employees";
import { getPayloads } from "../apis/payloads";
import { IDR } from "../utils/currency";
import { getDepartments } from "../apis/departments";
import { useState } from "react";
import url from "../utils/url";

export default function UserSalaryTable() {
  const employee = useQuery(
    [
      "employee",
      {
        endpoint: "me",
      },
    ],
    getEmployees
  );
  const [dateRange, setDateRange] = useState({
    start: time.yearMonth(new Date(), 1),
    end: time.yearMonth(new Date(), 1),
  });

  const queryFilter = {};
  if (dateRange.start && dateRange.end)
    queryFilter.dateRange = `${dateRange.start}:${dateRange.end}`;
  if (employee.data) queryFilter.employee = employee.data._id;

  const payloads = useQuery(
    [
      "payloads",
      {
        endpoint: "me",
        params: queryFilter,
      },
    ],
    getPayloads
  );
  const departments = useQuery("departments", getDepartments);

  const changeHandler = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  if (payloads.isLoading || departments.isLoading) return <Loader />;

  console.log(payloads.data);

  return (
    <>
      <CardMini className="w-full">
        <form className="flex flex-col md:flex-row items-stretch md:items-center flex-wrap">
          <input
            type="month"
            name="start"
            value={dateRange.start}
            onChange={changeHandler}
            className="px-4 py-1 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700 my-2 md:my-0 md:mr-4"
          />
          <input
            type="month"
            name="end"
            value={dateRange.end}
            onChange={changeHandler}
            className="px-4 py-1 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700 my-2 md:my-0 md:mr-4"
          />
          <div className="ml-auto"></div>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600">Tabel Slip Gaji</h1>
          <div className="ml-auto"></div>
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/payloads/me/print?${url.queryString(queryFilter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm md:ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="border py-2 px-4">NO.</th>
              <th className="border py-2 px-4">Tanggal</th>
              <th className="border py-2 px-4">GAJI POKOK</th>
              <th className="border py-2 px-4">BONUS</th>
              <th className="border py-2 px-4">POTONGAN</th>
              <th className="border py-2 px-4">TOTAL</th>
              <th className="border py-2 px-4">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {payloads.data &&
              payloads.data.map((payload, index) => {
                const salaryTotal =
                  payload.salary + payload.bonus - payload.reduction;
                return (
                  <tr key={payload._id}>
                    <td className="py-2 px-4 border text-center">1</td>
                    <td className="py-2 px-4 border text-center">
                      {time.getMonth(payload.month)}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {IDR(payload.salary)}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payload.bonus}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payload.reduction}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {IDR(salaryTotal)}
                    </td>
                    <td className="py-1 px-4 border text-center whitespace-no-wrap">
                      <Link
                        to={`/user/salaries/${payload._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                        <i className="fas fa-search"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            {payloads.length === 0 && (
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
      </CardExtraLarge>
    </>
  );
}
