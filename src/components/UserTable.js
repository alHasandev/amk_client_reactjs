import React from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardLarge } from "./Card";
import { useAxiosGet } from "../hooks/request";
import Error from "./Error";
import Loader from "./Loader";

export default function UserTable() {
  const [users, isLoading, error] = useAxiosGet("/users");

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!users) return <Error error={{ message: "Users not found!" }} />;

  return (
    <CardLarge className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 pb-4">NO.</th>
            <th className="py-2 px-4 pb-4">IMAGE</th>
            <th className="py-2 px-4 pb-4">NAME</th>
            <th className="py-2 px-4 pb-4">EMAIL</th>
            <th className="py-2 px-4 pb-4">PRIVILEGE</th>
            <th className="py-2 px-4 pb-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border text-center">1</td>
              <td className="p-1 border text-center w-16">
                <div className="border-2 border-yellow-600 rounded bg-gray-200">
                  <img src={profileImage} alt="profile" />
                </div>
              </td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border text-center uppercase">
                {user.privilege}
              </td>

              <td className="py-1 px-4 border text-center">
                <Link
                  to="/candidates"
                  className="rounded font-bold text-white bg-green-500 hover:bg-green-600 py-1 px-2 mr-2">
                  <i className="fas fa-edit"></i>
                </Link>
                <Link
                  to="/candidates"
                  className="rounded font-bold text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                  <i className="fas fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardLarge>
  );
}
