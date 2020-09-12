import React from "react";
import { CardExtraLarge } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import { useQuery } from "react-query";
import { getAssessments, deleteAssessment } from "../apis/assessments";
import time from "../utils/time";

export default function AssessmentTable() {
  const assessments = useQuery("assesments", getAssessments);
  console.log(assessments.data);

  const getYears = function (start = 2000, end = new Date().getFullYear()) {
    const years = [];
    for (let i = start; i < end; i++) {
      years.push(i);
    }
    return years;
  };

  if (assessments.isLoading) return <Loader />;

  return (
    <>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600">
            Tabel Penilaian Karyawan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/assessments/create"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Tambah Penilaian
          </Link>
          <a
            href="http://localhost:5000/assessments/print?"
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
              <th className="border py-2 px-4">Bulan</th>
              <th className="border py-2 px-4">NIK</th>
              <th className="border py-2 px-4 text-left">Nama Karyawan</th>
              <th className="border py-2 px-4">Sikap</th>
              <th className="border py-2 px-4">Keahlian</th>
              <th className="border py-2 px-4">Kerajian</th>
              <th className="border py-2 px-4">Kerapian</th>
              <th className="border py-2 px-4 text-left">Komentar</th>
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
      </CardExtraLarge>
    </>
  );
}
