import React, { useState, useEffect } from "react";
import { CardSmall, CardLarge } from "../../components/Card";
import { Link } from "react-router-dom";
import { useAxiosGet } from "../../hooks/request";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import axios from "axios";
import { reverseNormalDate, normalDate } from "../../utils/time";

const schoolDegrees = [
  {
    value: "Dasar",
    label: "Dasar",
  },
  {
    value: "Menengah",
    label: "Menengah",
  },
  {
    value: "Atas",
    label: "Atas",
  },
  {
    value: "Diploma 3",
    label: "Diploma 3",
  },
  {
    value: "Sarjana 1",
    label: "Sarjana 1",
  },
  {
    value: "Sarjana 2",
    label: "Sarjana 2",
  },
  {
    value: "Sarjana 3",
    label: "Sarjana 3",
  },
];

export default function Education() {
  const [profile, isLoading, error] = useAxiosGet("/profiles/me");
  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    major: "",
    from: "",
    to: "",
    isCurrently: false,
    description: "",
  });

  const resetForm = (ev) => {
    setFormData({
      school: "",
      degree: "",
      major: "",
      from: "",
      to: "",
      isCurrently: false,
      description: "",
    });
  };

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const checkHandler = (ev) => {
    console.log(ev.target.checked);
    setFormData({ ...formData, [ev.target.name]: ev.target.checked });
  };

  const editEducation = (education) => {
    console.log(education);
    setFormData({
      _id: education._id,
      school: education.school,
      degree: education.degree,
      major: education.major,
      from: education.from,
      to: education.to,
      isCurrently: education.isCurrently,
      description: education.description,
    });

    document.getElementById("school").focus();
  };

  const removeEducation = async (educationId) => {
    console.log(educationId);
    if (window.confirm("Apakah anda yakin akan menghapus pendidikan ini ?")) {
      try {
        const res = await axios.delete(`/profiles/educations/${educationId}`);

        setEducations(res.data);
        console.log(res.data);
        alert("Pendidikan berhasil dihapus!");
      } catch (err) {
        alert("Pendidikan gagal dihapus!");
        console.log(JSON.stringify(err));
      } finally {
        resetForm();
      }
    }
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);

    try {
      let res;
      if (formData._id) {
        res = await axios.put(`/profiles/educations/${formData._id}`, formData);
      } else {
        res = await axios.post("/profiles/educations", formData);
      }
      setEducations(res.data);
      alert("Pendidikan berhasil diupdate!");
    } catch (err) {
      alert("Error, gagal mengupdate pendidikan!");
      console.error(err);
    } finally {
      resetForm();
    }
  };

  useEffect(() => {
    if (profile) {
      setEducations(profile.educations);
    }
  }, [profile]);

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!profile) return <Error error={{ message: "No Profile Found!" }} />;

  return (
    <div className="grid gap-4 items-start xl:grid-cols-5 xl:grid-flow-row-dense">
      <CardSmall className="xl:col-span-2 xl:col-start-4">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-2xl text-yellow-600">Education Form</h1>
          <p className="text-sm text-gray-500 mb-4">Update pendidikan kamu</p>

          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Nama Sekolah</label>
            <input
              type="text"
              name="school"
              id="school"
              value={formData.school}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Nama formal sekolah..."
            />
          </div>
          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Tingkat</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white focus:shadow-inner focus:border-yellow-500">
              <option value="">Pilih Tingkat Pendidikan</option>
              {schoolDegrees.map((degree, index) => (
                <option key={index} value={degree.value}>
                  {degree.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Jurusan</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Jurusan yang ditempuh"
            />
          </div>
          <div className="mb-4 text-sm text-gray-800 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-semibold mb-2">Dari</label>
              <input
                type="date"
                name="from"
                value={normalDate(formData.from)}
                onChange={changeHandler}
                className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Sampai</label>
              <input
                type="date"
                name="to"
                value={normalDate(formData.to)}
                onChange={changeHandler}
                className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isCurrently"
              onChange={checkHandler}
              className="mr-2 cursor-pointer"
              value={true}
              id="isCurrently"
              checked={formData.isCurrently}
            />
            <label
              htmlFor="isCurrently"
              className="font-semibold text-sm text-gray-800 cursor-pointer">
              Sedang Menjalani ?
            </label>
          </div>
          <div className="mb-8 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Keterangan</label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Deskripsi singkat tentang pendidikan anda ..."
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
      <CardLarge className="xl:col-span-3 xl:col-start-1">
        <table className="w-full text-gray-800 text-sm">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="px-2 py-2 pb-4">NO.</th>
              <th className="px-2 py-2 pb-4">Nama Sekolah</th>
              <th className="px-2 py-2 pb-4">Tingkat</th>
              <th className="px-2 py-2 pb-4">Jurusan</th>
              <th className="px-2 py-2 pb-4">Waktu</th>
              <th className="px-2 py-2 pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {educations.map((education, index) => (
              <tr
                key={education._id}
                className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-2 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border px-2 py-2 font-bold md:font-normal text-center md:text-left">
                  {education.school}
                </td>
                <td className="border px-2 py-2 text-center">
                  {education.degree}
                </td>
                <td className="border px-2 py-2 text-center">
                  {education.major}
                </td>
                <td className="border px-2 py-2 text-center whitespace-no-wrap">
                  {reverseNormalDate(education.from)} ~{" "}
                  {!education.isCurrently
                    ? reverseNormalDate(education.to)
                    : "Sekarang"}
                </td>
                <td className="border px-2 py-2 text-center">
                  <div className="flex flex-wrap justify-center">
                    <button
                      onClick={(ev) => editEducation(education)}
                      className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none mx-4 md:mx-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={(ev) => removeEducation(education._id)}
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none mx-4 md:mx-2">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!educations.length && (
              <tr>
                <td className="border px-2 py-2 text-center">0</td>
                <td className="border px-2 py-2 text-center" colSpan="4">
                  Silahkan tambahkan pendidikan anda!
                </td>
                <td className="border px-2 py-2 text-center"></td>
              </tr>
            )}
          </tbody>
        </table>
      </CardLarge>
    </div>
  );
}
