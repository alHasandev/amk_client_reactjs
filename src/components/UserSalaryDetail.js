import React, { useEffect, useState } from "react";
import { CardMedium } from "./Card";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPayloads } from "../apis/payloads";
import Loader from "./Loader";
import time from "../utils/time";
import { getDepartments } from "../apis/departments";
import { IDR } from "../utils/currency";

export default function UserSalaryDetail() {
  const params = useParams();
  const payload = useQuery(
    [
      "payload",
      {
        endpoint: params.payloadId,
      },
    ],
    getPayloads
  );
  const [department, setDepartment] = useState({
    code: "",
    name: "",
  });

  useEffect(() => {
    if (payload.data && payload.data.employee) {
      getDepartments("department", {
        endpoint: payload.data.employee.department,
      }).then((data) => {
        setDepartment({
          code: data.code,
          name: data.name,
        });
      });
    }
  }, [payload.data]);

  if (payload.isLoading) return <Loader />;
  const employee = payload.data.employee;
  const salaryTotal =
    payload.data.salary + payload.data.bonus - payload.data.reduction;

  return (
    <CardMedium>
      <div className="flex flex-wrap md:items-center mb-4">
        <h2 className="font-bold text-xl text-yellow-600">
          SLIP GAJI KARYAWAN
        </h2>
        <div className="ml-auto"></div>
        <a
          href={`http://localhost:5000/payloads/print/${params.payloadId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Cetak
        </a>
      </div>
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Bulan
            </th>
            <td className="border px-4 py-2">
              {time.getMonth(payload.data.month)}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              NIK
            </th>
            <td className="border px-4 py-2">{employee.user.nik}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Nama
            </th>
            <td className="border px-4 py-2">{employee.user.name}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Jabatan/Posisi
            </th>
            <td className="border px-4 py-2">
              [{employee.position.code}] {employee.position.name}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Department
            </th>
            <td className="border px-4 py-2">
              [{department.code}] {department.name}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Gaji Pokok
            </th>
            <td className="border px-4 py-2">
              {IDR(employee.position.salary)}
            </td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Bonus
            </th>
            <td className="border px-4 py-2">{IDR(payload.data.bonus)}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Potongan
            </th>
            <td className="border px-4 py-2">{IDR(payload.data.reduction)}</td>
          </tr>
          <tr>
            <th className="border px-4 py-2 text-left font-semibold w-2/5">
              Peneriamaan Total Gaji
            </th>
            <td className="border px-4 py-2">{salaryTotal}</td>
          </tr>
        </tbody>
      </table>
    </CardMedium>
  );
}
