import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardLarge, CardMini } from "./Card";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getUsers, deleteUser, patchUser } from "../apis/users";
import url from "../utils/url";

export default function UserTable() {
  const [filter, setFilter] = useState({
    isActive: "true",
    privilege: "",
  });

  const queryObject = {};
  if (filter.isActive) queryObject.isActive = filter.isActive;
  if (filter.privilege) queryObject.privilege = filter.privilege;

  const users = useQuery(
    [
      "users",
      {
        params: {
          ...queryObject,
        },
      },
    ],
    getUsers
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  if (users.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full max-w-screen-lg text-sm">
        <form className="flex items-center">
          <div className="ml-auto"></div>
          <select
            name="privilege"
            value={filter.privilege}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none ml-4">
            <option value="">Semua</option>
            <option value="admin">Admin</option>
            <option value="employee">Karyawan</option>
            <option value="candidate">Calon Karyawan</option>
            <option value="user">Umum</option>
          </select>
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
            Tabel Pengguna
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/users/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Pengguna
          </Link>
          <a
            href={`http://localhost:5000/users/print?${url.queryString(
              queryObject
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border">NO.</th>
              <th className="py-2 px-4 border">Foto</th>
              <th className="py-2 px-4 border text-left">Nama Pengguna</th>
              <th className="py-2 px-4 border text-left">Email</th>
              <th className="py-2 px-4 border">Hak Akses</th>
              <th className="py-2 px-4 border">Aktif ?</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data &&
              users.data.map((user, index) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="p-1 border text-center w-16">
                    <div className="border-2 border-yellow-600 rounded bg-gray-200">
                      <img src={user.image} alt="profile" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border text-center uppercase">
                    {user.privilege}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {user.isActive ? "YES" : "NO"}
                  </td>

                  <td className="py-1 px-4 border text-center whitespace-no-wrap">
                    {user.isActive && (
                      <>
                        <Link
                          to={`/admin/users/${user._id}`}
                          className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={async (ev) => {
                            if (
                              window.confirm(
                                "Apakah anda yakin akan menghapus user ini ?"
                              )
                            ) {
                              if (
                                await deleteUser({
                                  endpoint: "soft/" + user._id,
                                })
                              ) {
                                await users.refetch();
                                alert("Berhasil menghapus user!");
                              } else {
                                alert("Gagal menghapus user!");
                              }
                            }
                          }}
                          className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </>
                    )}
                    {!user.isActive && (
                      <button
                        onClick={async (ev) => {
                          if (
                            window.confirm(
                              "Apakah anda yakin akan mengaktifkan kembali user ini ?"
                            )
                          ) {
                            // Build form data
                            const formBuild = new FormData();
                            formBuild.append("isActive", true);
                            if (
                              await patchUser(formBuild, {
                                endpoint: user._id,
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              })
                            ) {
                              await users.refetch();
                              alert("Berhasil mengaktifkan user!");
                            } else {
                              alert("Gagal mengaktifkan user!");
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
