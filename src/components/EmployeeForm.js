import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { getUsers } from "../apis/users";
import { getDepartments } from "../apis/departments";
import { getPositions } from "../apis/positions";
import { postEmployee, getEmployees, patchEmployee } from "../apis/employees";
import Loader from "./Loader";

export default function EmployeeForm() {
  const params = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    user: "",
    department: "",
    position: "",
  });

  const users = useQuery("users", getUsers);
  const departments = useQuery("departments", getDepartments);
  const positions = useQuery(
    [
      "positions",
      {
        department: formData.department,
      },
    ],
    getPositions
  );

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (params.employeeId) {
      if (
        await patchEmployee(formData, {
          endpoint: params.employeeId,
        })
      ) {
        alert("Berhasil mengupdate karyawan baru!");
        history.push("/admin/employees");
      } else {
        alert("Gagal mengupdate karyawan baru!");
      }
    } else {
      if (await postEmployee(formData)) {
        alert("Berhasil menambah karyawan baru!");
        history.push("/admin/employees");
      } else {
        alert("Gagal menambah karyawan baru!");
      }
    }
  };

  useEffect(() => {
    if (params.employeeId) {
      getEmployees("employee", {
        endpoint: params.employeeId,
      }).then((data) => {
        // console.log(data);
        setFormData({
          user: data.user._id,
          department: data.department._id,
          position: data.position._id,
        });
      });
    }
  }, []);

  if (departments.isLoading || positions.isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-2xl text-yellow-600">Employee Form</h1>
        <p className="text-gray-500 text-sm mb-4">Create or Update Employee</p>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            User
          </label>
          <select
            name="user"
            value={formData.user}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white">
            <option value="">Choose User</option>
            {users.data &&
              users.data.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nik} - {user.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white">
            <option value="">Choose Department</option>
            {departments.data &&
              departments.data.map((department) => (
                <option key={department._id} value={department._id}>
                  [{department.code}] {department.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Position
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white">
            {!formData.department ? (
              <option value="">Choose Department First!</option>
            ) : (
              <option value="">Choose Position</option>
            )}
            {Array.isArray(positions.data) &&
              positions.data.map((position) => (
                <option key={position._id} value={position._id}>
                  [{position.code}] {position.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex">
          <button
            type="submit"
            className="ml-auto inline-block px-4 py-2 rounded-sm shadow-sm bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
            Save
          </button>
        </div>
      </form>
    </CardSmall>
  );
}
