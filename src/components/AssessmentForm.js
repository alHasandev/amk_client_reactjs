import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import {
  getAssessments,
  postAssessment,
  patchAssessment,
} from "../apis/assessments";
import { getEmployees } from "../apis/employees";
import Loader from "./Loader";
import time from "../utils/time";

export default function AssessmentForm() {
  const params = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    month: time.yearMonth(new Date(), 1),
    employee: "",
    manner: 0,
    expertness: 0,
    diligence: 0,
    tidiness: 0,
    comment: "",
  });

  const employees = useQuery("employees", getEmployees);

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (params.assessmentId) {
      if (
        await patchAssessment(formData, {
          endpoint: params.assessmentId,
        })
      ) {
        alert("Berhasil mengupdate penilaian");
        history.push("/admin/assessments");
      } else {
        alert("Gagal mengupdate Penilaian!");
      }
    } else {
      if (await postAssessment(formData)) {
        alert("Berhasil menambah penilaian baru");
        history.push("/admin/assessments");
      } else {
        alert("Gagal menambah Penilaian baru!");
      }
    }
  };

  useEffect(() => {
    if (params.assessmentId) {
      getAssessments("assesment", {
        endpoint: params.assessmentId,
      }).then((data) => {
        setFormData({
          month: data.month,
          employee: data.employee._id,
          manner: data.manner,
          expertness: data.expertness,
          diligence: data.diligence,
          tidiness: data.tidiness,
          comment: data.comment,
        });
      });
    }
  }, []);

  if (employees.isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-2xl text-yellow-600">
          Form Penilaian Karyawan
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          Create or Update Assessment
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
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Karyawan
          </label>
          <select
            name="employee"
            value={formData.employee}
            onChange={changeHandler}
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
            Sikap
          </label>
          <input
            type="number"
            name="manner"
            value={formData.manner}
            onChange={changeHandler}
            min="0"
            max="10"
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Keahlian
          </label>
          <input
            type="number"
            name="expertness"
            value={formData.expertness}
            onChange={changeHandler}
            min="0"
            max="10"
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Kerajian
          </label>
          <input
            type="number"
            name="diligence"
            value={formData.diligence}
            onChange={changeHandler}
            min="0"
            max="10"
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Kerapian
          </label>
          <input
            type="number"
            name="tidiness"
            value={formData.tidiness}
            onChange={changeHandler}
            min="0"
            max="10"
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Komentar
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500"
          />
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
