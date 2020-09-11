// Import modules
import React from "react";
import { Link, useParams } from "react-router-dom";

// Import components
import { CardLarge } from "./Card";
import Loader from "./Loader";

// Import utilites function
import { IDR } from "../utils/currency";
import { useQuery } from "react-query";
import { getPositions, deletePosition } from "../apis/positions";

export default function PositionTable() {
  const params = useParams();
  const positions = useQuery(
    [
      "positions",
      {
        params: {
          department: params.departmentId,
          isActive: true,
        },
      },
    ],
    getPositions
  );

  if (positions.isLoading) return <Loader />;

  return (
    <CardLarge className="overflow-x-auto">
      <div className="md:flex items-center mb-4">
        <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
          Tabel Posisi
        </h1>
        <div className="ml-auto"></div>
        <Link
          to={`/admin/departments/${params.departmentId}/create`}
          className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
          Tambah Posisi
        </Link>
        <a
          href={`http://localhost:5000/positions/print?department=${params.departmentId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 ml-4">
          Report
        </a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border">NO.</th>
            <th className="py-2 px-4 border">CODE</th>
            <th className="py-2 px-4 border">NAME</th>
            <th className="py-2 px-4 border">LEVEL</th>
            <th className="py-2 px-4 border">PAY</th>
            <th className="py-2 px-4 border">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {positions.data &&
            positions.data.map((position, index) => (
              <tr key={position._id}>
                <td className="py-2 px-4 border text-center">{index + 1}</td>
                <td className="py-2 px-4 border text-center">
                  {position.code}
                </td>
                <td className="py-2 px-4 border">{position.name}</td>
                <td className="py-2 px-4 border text-center">
                  {position.level}
                </td>
                <td className="py-1 px-4 border text-right">
                  {IDR(position.salary)}
                </td>
                <td className="py-1 px-4 border text-center">
                  <Link
                    to={`/admin/departments/${params.departmentId}/${position._id}`}
                    className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={async (ev) => {
                      if (
                        window.confirm(
                          `Apakah anda yakin akan menghapus posisi: ${position.name} ?`
                        )
                      ) {
                        if (
                          await deletePosition({
                            endpoint: "soft/" + position._id,
                          })
                        ) {
                          await positions.refetch();
                          alert(
                            `Berhasil menghapus posisi: ${position.name} !`
                          );
                        } else {
                          alert(`Gagal menghapus posisi: ${position.name} !`);
                        }
                      }
                    }}
                    className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </CardLarge>
  );
}
