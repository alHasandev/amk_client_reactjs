import React from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import time, { calculateAge, localDate } from "../utils/time";
import { useQuery, useMutation } from "react-query";
import { getEmployees } from "../apis/employees";
import { getPayloads, deletePayload } from "../apis/payloads";
import { IDR } from "../utils/currency";
import { getDepartments } from "../apis/departments";
import { useState } from "react";
import url from "../utils/url";

export default function PayloadTable() {
  const [filter, setFilter] = useState({
    month: time.yearMonth(new Date(), 1),
    department: "",
  });

  const queryFilter = {};
  if (filter.month) queryFilter.month = filter.month;
  if (filter.department) queryFilter.department = filter.department;

  const payloads = useQuery(
    [
      "payloads",
      {
        params: queryFilter,
      },
    ],
    getPayloads
  );
  const departments = useQuery("departments", getDepartments);

  const changeHandler = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  if (payloads.isLoading || departments.isLoading) return <Loader />;

  console.log(payloads.data);

  return (
    <>
      <CardMini className="w-full">
        <form className="flex flex-wrap">
          <input
            type="month"
            name="month"
            value={filter.month}
            onChange={changeHandler}
            className="px-4 py-2 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
          />
          <div className="ml-auto"></div>
          <select
            name="department"
            value={filter.department}
            onChange={changeHandler}
            className="px-4 py-2 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700">
            <option value="">Filter Department</option>
            {departments.data &&
              departments.data.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600">
            Tabel Penggajihan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/payloads/create"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Tambah Perhitungan
          </Link>
          <a
            href={`http://localhost:5000/payloads/print?${url.queryString(
              queryFilter
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Report
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="border py-2 px-4">NO.</th>
              <th className="border py-2 px-4">Tanggal</th>
              <th className="border py-2 px-4">NIK</th>
              <th className="border py-2 px-4">NAMA</th>
              <th className="border py-2 px-4">POSISI</th>
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
                const employee = payload.employee;
                const salaryTotal =
                  payload.salary + payload.bonus - payload.reduction;
                return (
                  <tr key={payload._id}>
                    <td className="py-2 px-4 border text-center">1</td>
                    <td className="py-2 px-4 border text-center">
                      {time.getMonth(payload.month)}
                    </td>
                    <td className="py-2 px-4 border">{employee.user.nik}</td>
                    <td className="py-2 px-4 border">{employee.user.name}</td>
                    <td className="py-2 px-4 border uppercase">
                      {employee.position.code}
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
                        to={`/admin/payloads/${payload._id}`}
                        className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        onClick={(ev) => {
                          if (
                            window.confirm(
                              `Apakah anda yakin akan menghapus perhitungan gaji [${time.getMonth(
                                payload.month
                              )}] ${employee.user.name} ?`
                            )
                          ) {
                            deletePayload({
                              endpoint: payload._id,
                            }).then(async (data) => {
                              if (data) {
                                await payloads.refetch();
                                alert("Berhasil menghapus data");
                              } else {
                                alert("Gagal menghapus data");
                              }
                            });
                          }
                        }}
                        className="inline-block rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2 mr-2">
                        <i className="fas fa-trash-alt"></i>
                      </button>
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
