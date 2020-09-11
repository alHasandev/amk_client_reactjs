import React, { useState, useEffect } from "react";
import Container from "../layout/Container";
import { CardSmall, CardMedium } from "./Card";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { useAxiosGet, useAxios } from "../hooks/request";
import Loader from "./Loader";
import Error from "./Error";
import { useQuery } from "react-query";
import { getEmployees } from "../apis/employees";
import { IDR } from "../utils/currency";
import { postPayload, getPayloads, patchPayload } from "../apis/payloads";

export default function PayloadForm() {
  const params = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const employees = useQuery("employees", getEmployees);

  // Form state
  const [formData, setFormData] = useState({
    month: "",
    employee: "",
    department: "",
    salary: 0,
    bonus: 0,
    reduction: 0,
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const selectEmployee = (ev) => {
    // setFormData({ ...formData, employee: ev.target.value });
    const employee = employees.data.find(
      (employee) => employee._id === ev.target.value
    );
    setFormData({
      ...formData,
      employee: ev.target.value,
      department: employee.department._id,
      salary: employee.position.salary,
    });
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);
    switch (!formData._id) {
      case true:
        if (await postPayload(formData)) {
          alert("Berhasil Menambah Perhitungan Gaji!!");
          history.push("/admin/payloads");
        } else {
          alert("Gagal Menambah Perhitungan Gaji!!");
        }
        break;
      case false:
        if (
          await patchPayload(formData, {
            endpoint: params.payloadId,
          })
        ) {
          alert("Berhasil Mengupdate Perhitungan Gaji!!");
          history.push("/admin/payloads");
        } else {
          alert("Gagal Mengupdate Perhitungan Gaji!!");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (params.payloadId) {
      setIsLoading(true);
      getPayloads("payload", {
        endpoint: params.payloadId,
      }).then((data) => {
        setFormData({
          _id: data._id,
          month: data.month,
          employee: data.employee._id,
          department: data.employee.department,
          salary: data.salary,
          bonus: data.bonus,
          reduction: data.reduction,
        });
        setIsLoading(false);
      });
    }
  }, [params]);

  if (isLoading || employees.isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-yellow-700 text-2xl">Perhitungan Gaji</h1>
        <p className="text-gray-500 text-sm mb-4">
          Tambah / Update Perhitungan Gaji
        </p>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Bulan
          </label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={changeHandler}
            required={true}
            readOnly={formData._id ? true : false}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Karyawan
          </label>
          <select
            name="employee"
            value={formData.employee}
            onChange={selectEmployee}
            required={true}
            readOnly={formData._id ? true : false}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white">
            <option value="">Pilih Karyawan</option>
            {employees.data &&
              employees.data.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.user.nik} - {employee.user.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Gaji Pokok
          </label>
          <input
            name="salary"
            value={IDR(formData.salary)}
            onChange={changeHandler}
            readOnly={true}
            className="w-full block text-sm border outline-none cursor-not-allowed px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Bonus
          </label>
          <input
            name="bonus"
            value={formData.bonus}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Potongan
          </label>
          <input
            name="reduction"
            value={formData.reduction}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Total Gaji
          </label>
          <input
            name="salaryTotal"
            value={IDR(
              Number(formData.salary) +
                Number(formData.bonus) -
                Number(formData.reduction)
            )}
            readOnly={true}
            className="w-full block text-sm border outline-none cursor-not-allowed px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="submit"
            className="inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-sm shadow-sm hover:bg-yellow-600 hover:text-white focus:outline-none">
            Save
          </button>
          <Link
            to="/admin/payloads"
            className="inline-block bg-gray-400 text-black font-semibold px-4 py-2 rounded-sm shadow-sm hover:bg-gray-500 hover:text-white focus:outline-none mr-4">
            Cancel
          </Link>
        </div>
      </form>
    </CardSmall>
  );
}
