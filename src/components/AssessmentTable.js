import React, { useState } from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import { useQuery } from "react-query";
import { getAssessments, deleteAssessment } from "../apis/assessments";
import time from "../utils/time";
import url from "../utils/url";
import { getEmployees } from "../apis/employees";

export default function AssessmentTable() {
  const [filter, setFilter] = useState({
    employee: "",
    month: "",
  });

  const queryObject = {};
  // queryObject.isActive = true;
  if (filter.month) queryObject.month = filter.month;
  if (filter.employee) queryObject.employee = filter.employee;

  const employees = useQuery(["employees"], getEmployees);

  const assessments = useQuery(
    [
      "assesments",
      {
        params: {
          ...queryObject,
        },
      },
    ],
    getAssessments
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  // const changeDate = (ev) =>
  //   setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetMonth = (ev) => {
    ev.preventDefault();
    setFilter({ ...filter, month: "" });
  };

  if (assessments.isLoading || employees.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full text-sm">
        <form className="flex items-center">
          <input
            type="month"
            name="month"
            value={filter.month}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none mr-4"
          />
          <button
            type="reset"
            onClick={resetMonth}
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none mr-4">
            Reset
          </button>
          <div className="ml-auto"></div>
          <select
            name="employee"
            value={filter.employee}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none ml-4">
            <option value="">Filter Karyawan</option>
            {employees.data &&
              employees.data.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  [{employee.user.nik}] {employee.user.name}
                </option>
              ))}
          </select>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600">
            Tabel Penilaian Karyawan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/assessments/create"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Tambah Penilaian
          </Link>
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/assessments/print/?${url.queryString(queryObject)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border py-2 px-4">NO.</th>
                <th className="border py-2 px-4">Bulan</th>
                <th className="border py-2 px-4">NIK</th>
                <th className="border py-2 px-4 text-left">Nama Karyawan</th>
                <th className="border py-2 px-4">Sikap</th>
                <th className="border py-2 px-4">Keahlian</th>
                <th className="border py-2 px-4">Kerajian</th>
                <th className="border py-2 px-4">Kerapian</th>
                <th className="border py-2 px-4 text-left">Komentar</th>
                <th className="border py-2 px-4 text-center">Detail</th>
                <th className="border py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {assessments.data &&
                assessments.data.map((assessment, index) => {
                  let employee = assessment.employee ? assessment.employee : {};
                  return (
                    <tr key={assessment._id}>
                      <td className="py-2 px-4 border text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border whitespace-no-wrap">
                        {time.getMonth(assessment.month)}
                      </td>
                      <td className="py-2 px-4 border">
                        {employee.user && employee.user.nik}
                      </td>
                      <td className="py-2 px-4 border">
                        {employee.user && employee.user.name}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {assessment.manner}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {assessment.expertness}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {assessment.diligence}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {assessment.tidiness}
                      </td>
                      <td className="py-2 px-4 border">{assessment.comment}</td>

                      <td className="py-2 px-4 border text-center">
                        <Link
                          to={`/admin/assessments/${assessment._id}`}
                          className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                          <i className="fas fa-search"></i>
                        </Link>
                      </td>
                      <td className="py-1 px-4 border text-center whitespace-no-wrap">
                        <Link
                          to={`/admin/assessments/edit/${assessment._id}`}
                          className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={async (ev) => {
                            if (
                              window.confirm(
                                "Apakah anda yakin akan menghapus penilaian ini ?"
                              )
                            ) {
                              if (
                                await deleteAssessment({
                                  endpoint: assessment._id,
                                })
                              ) {
                                await assessments.refetch();
                                alert("Berhasil menghapus penilaian!");
                              } else {
                                alert("Gagal menghapus penilaian!");
                              }
                            }
                          }}
                          className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {assessments.length === 0 && (
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
        </div>
      </CardExtraLarge>
    </>
  );
}
