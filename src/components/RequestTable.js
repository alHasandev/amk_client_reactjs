import React from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";
import { CardExtraLarge } from "./Card";
import { normalDate } from "../utils/time";
import { Link } from "react-router-dom";
import { getRequests, deleteRequest } from "../apis/requests";

const statusLabel = {
  pending: {
    color: "bg-yellow-600 text-white",
    label: "Pending",
  },
  accepted: {
    color: "bg-green-500 text-white",
    label: "Diterima",
  },
  rejected: {
    color: "bg-red-500 text-white",
    label: "Ditolak",
  },
};

export default function RequestTable() {
  const requests = useQuery("requests", getRequests);

  if (requests.isLoading) return <Loader />;

  return (
    <CardExtraLarge>
      <div className="md:flex items-center mb-4">
        <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
          Tabel Permintaan
        </h1>
        <div className="ml-auto"></div>
        <Link
          to="/admin/requests/create"
          className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
          Tambah Permintaan
        </Link>
        <a
          href="http://localhost:5000/requests/print"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm font-semibold shadow-sm ml-4">
          Report
        </a>
      </div>
      <table className="w-full text-sm">
        <thead className="hidden md:table-header-group">
          <tr>
            <th className="border px-4 py-2">NO.</th>
            <th className="border px-4 py-2">Tanggal</th>
            <th className="border px-4 py-2">Dari</th>
            <th className="border px-4 py-2">Detail Permintaan</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {requests.data &&
            requests.data.map((request, index) => (
              <tr key={request._id} className="grid mb-4 md:mb-0 md:table-row">
                <td className="border px-4 py-2 text-center hidden md:table-cell">
                  {index + 1}
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal whitespace-no-wrap text-center">
                  {normalDate(request.createdAt)}
                </td>
                <td className="border px-4 py-2">
                  {request.from
                    ? `[${request.from.position.code}] ${request.from.user.name}`
                    : "NULL"}
                </td>
                <td className="border px-4 py-2">{request.message}</td>
                <td className="border px-4 py-2">
                  <div
                    className={`px-2 rounded-full uppercase text-center ${
                      statusLabel[request.status].color
                    }`}>
                    {statusLabel[request.status].label}
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-wrap justify-around">
                    <Link
                      to={`/admin/requests/edit/${request._id}`}
                      className="inline-block rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 focus:outline-none">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={async (ev) => {
                        if (
                          window.confirm(
                            "Apakah anda yakin akan menghapus request ?"
                          )
                        ) {
                          if (await deleteRequest(request._id)) {
                            await requests.refetch();
                            alert("Berhasil menghapus request!");
                          } else {
                            alert("Gagal menghapus request!");
                          }
                        }
                      }}
                      className="inline-block rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2 focus:outline-none">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </CardExtraLarge>
  );
}
