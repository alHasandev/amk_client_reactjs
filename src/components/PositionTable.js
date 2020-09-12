// Import modules
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import components
import { CardLarge, CardMini } from "./Card";
import Loader from "./Loader";

// Import utilites function
import { IDR } from "../utils/currency";
import { useQuery } from "react-query";
import { getPositions, deletePosition, patchPosition } from "../apis/positions";
import url from "../utils/url";

export default function PositionTable() {
  const params = useParams();
  const [filter, setFilter] = useState({
    isActive: "true",
  });

  const queryObject = {};
  queryObject.department = params.departmentId;
  if (filter.isActive) queryObject.isActive = filter.isActive;

  const positions = useQuery(
    [
      "positions",
      {
        params: {
          ...queryObject,
        },
      },
    ],
    getPositions
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  if (positions.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-lg text-sm">
        <form className="flex items-center">
          <div className="ml-auto"></div>
          <select
            name="isActive"
            value={filter.isActive}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none ml-4">
            <option value="true">Aktif</option>
            <option value="false">Non-Aktif</option>
          </select>
        </form>
      </CardMini>
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
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/positions/print?${url.queryString(queryObject)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700 ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border">NO.</th>
              <th className="py-2 px-4 border text-left">Code</th>
              <th className="py-2 px-4 border text-left">Nama Jabatan</th>
              <th className="py-2 px-4 border">Level</th>
              <th className="py-2 px-4 border">Gaji Pokok</th>
              <th className="py-2 px-4 border">Action</th>
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
                  <td className="py-2 px-4 border text-center uppercase">
                    {position.level}
                  </td>
                  <td className="py-1 px-4 border text-center">
                    {IDR(position.salary)}
                  </td>
                  <td className="py-1 px-4 border text-center">
                    {position.isActive && (
                      <>
                        <Link
                          to={`/admin/positions/edit/${position._id}`}
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
                              try {
                                await deletePosition({
                                  endpoint: "soft/" + position._id,
                                });
                                await positions.refetch();
                                alert(
                                  `Berhasil menghapus posisi: ${position.name}`
                                );
                              } catch (err) {
                                alert(
                                  `Gagal menghapus posisi: ${position.name}`
                                );
                              }
                            }
                          }}
                          className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </>
                    )}
                    {!position.isActive && (
                      <button
                        onClick={async (ev) => {
                          if (
                            window.confirm(
                              "Apakah anda yakin akan mengaktifkan kembali posisi ini ?"
                            )
                          ) {
                            if (
                              await patchPosition(
                                { isActive: true },
                                {
                                  endpoint: position._id,
                                }
                              )
                            ) {
                              await positions.refetch();
                              alert("Berhasil mengaktifkan posisi!");
                            } else {
                              alert("Gagal mengaktifkan posisi!");
                            }
                          }
                        }}
                        className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2">
                        <i className="fas fa-undo-alt"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardLarge>
    </>
  );
}
