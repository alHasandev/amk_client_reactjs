import React, { useState } from "react";
import { CardSmall } from "./Card";
import { useQuery } from "react-query";
import Axios from "axios";
import { normalDate } from "../utils/time";
import Loader from "./Loader";
import { useHistory } from "react-router-dom";

const getEmployees = async () => {
  try {
    const res = await Axios.get("/employees");
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const postAttendance = async (data) => {
  try {
    const res = await Axios.post("/attendances/", data);
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function AttendanceForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    employee: "",
    date: normalDate(new Date()),
    status: "",
    dayLeave: 0,
    description: "",
  });

  const employees = useQuery("employees", getEmployees);

  const resetForm = () => {
    setFormData({
      employee: "",
      date: normalDate(new Date()),
      status: "",
      dayLeave: 0,
      description: "",
    });
  };

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);
    if (await postAttendance(formData)) {
      history.push("/admin/employees/attendances");
    } else {
      alert("Gagal menambahkan absensi");
    }
  };

  if (employees.isLoading || !employees.data) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-2xl text-yellow-600">Attendance Form</h1>
        <p className="text-sm text-gray-500 mb-4">Add new attendance</p>

        <div className="mb-4 text-sm text-gray-800">
          <label className="block font-semibold mb-2">Karyawan</label>
          <select
            name="employee"
            value={formData.employee}
            onChange={changeHandler}
            className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white focus:shadow-inner focus:border-yellow-500">
            <option value="">Pilih Karyawan</option>
            {employees.data.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.user.nik} - {employee.user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 text-sm text-gray-800">
          <label className="block font-semibold mb-2">Tanggal</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={changeHandler}
            className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
          />
        </div>
        <div className="mb-4 text-sm text-gray-800">
          <label className="block font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={changeHandler}
            className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white focus:shadow-inner focus:border-yellow-500">
            <option value="">Pilih Status</option>
            <option value="absence">Tidak Hadir</option>
            <option value="present">Hadir</option>
            <option value="leave">Cuti/Libur</option>
          </select>
        </div>

        {formData.status === "leave" && (
          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Lama Cuti/Izin</label>
            <input
              type="number"
              name="dayLeave"
              value={formData.dayLeave}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Lama cuti/izin.."
            />
          </div>
        )}

        <div className="mb-4 text-sm text-gray-800">
          <label className="block font-semibold mb-2">Keterangan</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={changeHandler}
            rows="3"
            className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
          />
        </div>

        <div className="flex">
          <button
            type="reset"
            onClick={resetForm}
            to="/user/profile"
            className="inline-block px-4 py-2 rounded-sm shadow-sm bg-gray-200 text-black font-semibold hover:bg-gray-400 ml-auto mr-4">
            Reset
          </button>
          <button
            type="submit"
            className="inline-block px-4 py-2 rounded-sm shadow-sm bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
            {formData._id ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </CardSmall>
  );
}
