import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRequests } from "../apis/requests";
import { statusColors } from "../assets";
import time from "../utils/time";
import { CardMedium } from "./Card";
import Loader from "./Loader";

export default function RequestDetail() {
  const params = useParams();

  const requestQuery = useQuery(
    [
      "request",
      {
        endpoint: params.requestId,
      },
    ],
    getRequests
  );

  if (requestQuery.isLoading) return <Loader />;
  const request = requestQuery.data;
  const from = request.from ? request.from : {};

  return (
    <CardMedium>
      <div className="flex mb-4 items-center">
        <h1 className="text-xl text-yellow-600 font-bold">Detail Permintaan</h1>
        <div className="ml-auto"></div>
        <a
          href={`http://localhost:5000/requests/print/${request._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Cetak
        </a>
      </div>
      <table className="w-full text-sm mb-4">
        <tbody>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              Tanggal Permintaan
            </th>
            <td className="px-4 py-2 border">
              {time.getDateString(request.createdAt)}
            </td>
          </tr>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              Tanggal Balasan
            </th>
            <td className="px-4 py-2 border">
              {time.getDateString(request.updatedAt)}
            </td>
          </tr>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              NIK
            </th>
            <td className="px-4 py-2 border">{from.user.nik}</td>
          </tr>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              Nama Karyawan
            </th>
            <td className="px-4 py-2 border">{from.user.name}</td>
          </tr>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              Posisi / Jabatan
            </th>
            <td className="px-4 py-2 border">
              [{from.position.code}] {from.position.name}
            </td>
          </tr>
          <tr className="grid md:table-row">
            <th className="px-4 py-2 border text-left text-gray-900 md:w-56 whitespace-no-wrap">
              Status Permintaan
            </th>
            <td className="px-4 py-2 border">
              <span
                to="/candidates"
                className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                  statusColors[request.status]
                }`}>
                {request.status}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="w-full text-sm mb-4">
        <tbody>
          <tr>
            <th className="px-4 py-2 border text-left">Detail Permintaan:</th>
          </tr>
          <tr>
            <td className="px-4 py-2 border text-left">{request.message}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <th className="px-4 py-2 border text-left">Komentar:</th>
          </tr>
          <tr>
            <td className="px-4 py-2 border text-left">{request.comment}</td>
          </tr>
        </tbody>
      </table>
    </CardMedium>
  );
}
