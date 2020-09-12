import React, { useEffect } from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import time from "../utils/time";
import { useQuery } from "react-query";
import { getEmployees } from "../apis/employees";
import { getPayloads, deletePayload } from "../apis/payloads";
import { IDR } from "../utils/currency";
import { getDepartments } from "../apis/departments";
import { useState } from "react";
import url from "../utils/url";

export default function PayloadTable() {
  const [filter, setFilter] = useState({
    month: "",
    department: "",
    employee: "",
  });

  const queryFilter = {};
  if (filter.month) queryFilter.month = filter.month;
  if (filter.department) queryFilter.department = filter.department;
  if (filter.employee) queryFilter.employee = filter.employee;

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
  const employees = useQuery("employees", getEmployees);

  const changeHandler = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const resetMonth = (ev) => setFilter({ ...filter, month: "" });

  useEffect(() => {
    if (filter.employee && employees.data) {
      const employee = employees.data.find(
        (employee) => employee._id === filter.employee
      );
      setFilter({
        employee: filter.employee,
        department: employee.department._id,
      });
      // console.log(employee);
    }
  }, [employees.data, filter.employee]);

  if (payloads.isLoading || departments.isLoading || employees.isLoading)
    return <Loader />;

  // console.log(payloads.data);

  return (
    <>
      <CardMini className="w-full">
        <form className="flex flex-wrap items-stretch flex-col md:flex-row">
          <input
            type="month"
            name="month"
            value={filter.month}
            onChange={changeHandler}
            className="px-2 py-1 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700 my-2 md:my-0 md:mr-4"
          />
          <button
            type="reset"
            onClick={resetMonth}
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 
            rounded-sm shadow md:mr-4">
            Reset Bulan
          </button>
          <div className="ml-auto"></div>
          <select
            name="employee"
            value={filter.employee}
            onChange={changeHandler}
            className="px-2 py-1 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700 my-2 md:my-0 md:ml-4">
            <option value="">Semua Karyawan</option>
            {employees.data &&
              employees.data.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  [{employee.user.nik}] {employee.user.name}
                </option>
              ))}
          </select>
          <select
            name="department"
            value={filter.department}
            onChange={changeHandler}
            disabled={!!filter.employee}
            className="px-2 py-1 text-sm rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700 my-2 md:my-0 md:ml-4">
            <option value="">Semua Departemen</option>
            {departments.data &&
              departments.data.map((department) => (
                <option key={department._id} value={department._id}>
                  [{department.code}] {department.name}
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
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Tambah Perhitungan
          </Link>
          <a
            href={`http://localhost:5000/payloads/print?${url.queryString(
              queryFilter
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="border py-2 px-4">NO.</th>
              <th className="border py-2 px-4">Bulan</th>
              <th className="border py-2 px-4">NIK</th>
              <th className="border py-2 px-4 text-left">Nama Karyawan</th>
              <th className="border py-2 px-4">Jabatan</th>
              <th className="border py-2 px-4">Gaji Pokok</th>
              <th className="border py-2 px-4">Bonus</th>
              <th className="border py-2 px-4">Potongan</th>
              <th className="border py-2 px-4">Total</th>
              <th className="border py-2 px-4">Action</th>
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
                    <td className="py-2 px-4 border text-center">
                      {employee.user.nik}
                    </td>
                    <td className="py-2 px-4 border">{employee.user.name}</td>
                    <td className="py-2 px-4 border text-center uppercase">
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
