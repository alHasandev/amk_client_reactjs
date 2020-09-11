import React from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardLarge } from "./Card";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getUsers, deleteUser } from "../apis/users";

export default function UserTable() {
  const users = useQuery("users", getUsers);

  if (users.isLoading) return <Loader />;

  return (
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
          href="http://localhost:5000/users/print"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Report
        </a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border">NO.</th>
            <th className="py-2 px-4 border">IMAGE</th>
            <th className="py-2 px-4 border">NAME</th>
            <th className="py-2 px-4 border">EMAIL</th>
            <th className="py-2 px-4 border">PRIVILEGE</th>
            <th className="py-2 px-4 border">Aktif ?</th>
            <th className="py-2 px-4 border">ACTION</th>
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
                <td className="py-2 px-4 border">
                  {user.isActive ? "YES" : "NO"}
                </td>

                <td className="py-1 px-4 border text-center whitespace-no-wrap">
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
                          await deleteUser({ endpoint: "soft/" + user._id })
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
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </CardLarge>
  );
}
