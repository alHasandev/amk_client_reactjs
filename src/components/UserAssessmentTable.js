import React from "react";
import { CardExtraLarge, CardLarge } from "./Card";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import { useQuery } from "react-query";
import { getAssessments, deleteAssessment } from "../apis/assessments";
import time from "../utils/time";

export default function UserAssessmentTable() {
  const assessments = useQuery(
    [
      "assesments",
      {
        endpoint: "me",
      },
    ],
    getAssessments
  );

  if (assessments.isLoading) return <Loader />;

  return (
    <>
      <CardLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600">
            Tabel Penilaian Karyawan
          </h1>
          <div className="ml-auto"></div>
          <a
            href="http://localhost:5000/assessments/print?"
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
              <th className="border py-2 px-4">Sikap</th>
              <th className="border py-2 px-4">Keahlian</th>
              <th className="border py-2 px-4">Kerajinan</th>
              <th className="border py-2 px-4">Kerapian</th>
              <th className="border py-2 px-4">Komentar</th>
              <th className="border py-2 px-4">Detail</th>
            </tr>
          </thead>
          <tbody>
            {assessments.data &&
              assessments.data.map((assessment, index) => {
                return (
                  <tr key={assessment._id}>
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {time.getMonth(assessment.month)}
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
                        to={`/admin/assessments/${assessment._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                        <i className="fas fa-search"></i>
                      </Link>
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
      </CardLarge>
    </>
  );
}
