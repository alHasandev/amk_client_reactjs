import React, { useState } from "react";
import { CardLarge, CardMini } from "./Card";
import { Link, useHistory, useParams } from "react-router-dom";
import Error from "./Error";
import Loader from "./Loader";
import { useQuery } from "react-query";
import {
  getDepartments,
  deleteDepartment,
  patchDepartment,
} from "../apis/departments";
import url from "../utils/url";

export default function DepartmentTable() {
  const params = useParams();
  const history = useHistory();
  const [filter, setFilter] = useState({
    isActive: "true",
  });

  const queryObject = {};
  if (filter.isActive) queryObject.isActive = filter.isActive;

  const departments = useQuery(
    [
      "departments",
      {
        params: { _id: params.departmentId, ...queryObject },
      },
    ],
    getDepartments
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  if (departments.isLoading) return <Loader />;
  if (!departments.data)
    return <Error error={{ message: "Departments not found!" }} />;

  return (
    <>
      {!params.departmentId && (
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
      )}
      <CardLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Departemen
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/departments/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Departemen
          </Link>
          <a
            href={`${
              process.env.REACT_APP_SERVER_LINK
            }/departments/print?${url.queryString(queryObject)}`}
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
              <th className="py-2 px-4 border">CODE</th>
              <th className="py-2 px-4 border">NAME</th>
              <th className="py-2 px-4 border">POSITIONS</th>
              <th className="py-2 px-4 border">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {departments.data &&
              departments.data.map((department, index) => (
                <tr key={department._id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {department.code}
                  </td>
                  <td className="py-2 px-4 border">{department.name}</td>
                  <td className="py-1 px-4 border text-center">
                    <Link
                      to={`/admin/departments/${department._id}`}
                      className="rounded font-bold bg-yellow-400 hover:bg-yellow-600 hover:text-white py-1 px-2">
                      {department.positions.length}
                    </Link>
                  </td>
                  <td className="py-1 px-4 border text-center">
                    {department.isActive && (
                      <>
                        <Link
                          to={`/admin/departments/edit/${department._id}`}
                          className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={async (ev) => {
                            if (
                              window.confirm(
                                `Apakah anda yakin akan menghapus department: ${department.name} ?`
                              )
                            ) {
                              try {
                                await deleteDepartment({
                                  endpoint: "soft/" + department._id,
                                });
                                await departments.refetch();
                                alert(
                                  `Berhasil menghapus department: ${department.name}`
                                );
                                if (params.departmentId)
                                  history.push("/admin/departments");
                              } catch (err) {
                                alert(
                                  `Gagal menghapus department: ${department.name}`
                                );
                              }
                            }
                          }}
                          className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </>
                    )}
                    {!department.isActive && (
                      <button
                        onClick={async (ev) => {
                          if (
                            window.confirm(
                              "Apakah anda yakin akan mengaktifkan kembali departemen ini ?"
                            )
                          ) {
                            if (
                              await patchDepartment(
                                { isActive: true },
                                {
                                  endpoint: department._id,
                                }
                              )
                            ) {
                              await departments.refetch();
                              alert("Berhasil mengaktifkan departemen!");
                            } else {
                              alert("Gagal mengaktifkan departemen!");
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
