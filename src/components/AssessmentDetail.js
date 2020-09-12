import React, { useEffect, useState } from "react";
import Card, { CardLarge, CardMedium } from "./Card";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPayloads } from "../apis/payloads";
import Loader from "./Loader";
import time from "../utils/time";
import { getDepartments } from "../apis/departments";
import { IDR } from "../utils/currency";
import { getAssessments } from "../apis/assessments";

export default function AssessmentDetail() {
  const params = useParams();
  const assessmentQuery = useQuery(
    [
      "assessment",
      {
        endpoint: params.assessmentId,
        params: {
          populate: JSON.stringify({
            populate: "user department position",
          }),
        },
      },
    ],
    getAssessments
  );

  if (assessmentQuery.isLoading) return <Loader />;
  const assessment = assessmentQuery.data;
  const employee = assessment.employee;
  const department = employee.department;
  const position = employee.position;

  return (
    <CardLarge>
      <div className="flex flex-wrap md:items-center mb-4">
        <h2 className="font-bold text-xl text-yellow-600">
          DETAIL PENILAIAN KARYAWAN
        </h2>
        <div className="ml-auto"></div>
        <a
          href={`http://localhost:5000/assessments/print/${params.assessmentId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Cetak
        </a>
      </div>
      <table className="w-full text-sm mb-4">
        <tbody>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              Bulan
            </th>
            <td className="border px-4 py-2">
              {time.getMonth(assessment.month)}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              NIK
            </th>
            <td className="border px-4 py-2">{employee.user.nik}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              Nama
            </th>
            <td className="border px-4 py-2">{employee.user.name}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              Jabatan/Posisi
            </th>
            <td className="border px-4 py-2">
              [{employee.position.code}] {employee.position.name}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              Department
            </th>
            <td className="border px-4 py-2">
              [{department.code}] {department.name}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="w-full text-sm mb-4">
        <thead>
          <tr>
            <th
              className="border px-4 py-2 text-left font-semibold md:w-64 align-top"
              rowSpan="2">
              NILAI
            </th>
            <th className="border px-4 py-2 text-center font-semibold">
              Sikap
            </th>
            <th className="border px-4 py-2 text-center font-semibold">
              Keahlian
            </th>
            <th className="border px-4 py-2 text-center font-semibold">
              Kerajinan
            </th>
            <th className="border px-4 py-2 text-center font-semibold">
              Kerapian
            </th>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-center">
              {assessment.manner}
            </td>
            <td className="border px-4 py-2 text-center">
              {assessment.expertness}
            </td>
            <td className="border px-4 py-2 text-center">
              {assessment.diligence}
            </td>
            <td className="border px-4 py-2 text-center">
              {assessment.tidiness}
            </td>
          </tr>
        </thead>
      </table>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold md:w-64">
              Komentar
            </th>
          </tr>
          <tr>
            <td className="border px-4 py-2 text-left">{assessment.comment}</td>
          </tr>
        </thead>
      </table>
    </CardLarge>
  );
}
