import React, { useState, useEffect } from "react";
import { CardSmall, CardLarge } from "../../components/Card";
import { Link } from "react-router-dom";
import { useAxiosGet } from "../../hooks/request";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import axios from "axios";
import { reverseNormalDate, normalDate } from "../../utils/time";

export default function Experience() {
  const [profile, isLoading, error] = useAxiosGet("/profiles/me");
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    field: "",
    job: "",
    from: "",
    to: "",
    isCurrently: false,
    description: "",
  });

  const resetForm = (ev) => {
    setFormData({
      company: "",
      field: "",
      job: "",
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

  const editExperience = (experience) => {
    console.log(experience);
    setFormData({
      _id: experience._id,
      company: experience.company,
      field: experience.field,
      job: experience.job,
      from: experience.from,
      to: experience.to,
      isCurrently: experience.isCurrently,
      description: experience.description,
    });
  };

  const removeExperience = async (experienceId) => {
    console.log(experienceId);
    if (window.confirm("Apakah anda yakin akan menghapus pengalaman ini ?")) {
      try {
        const res = await axios.delete(`/profiles/experiences/${experienceId}`);

        setExperiences(res.data);
        console.log(res.data);
        alert("Pengalaman berhasil dihapus!");
      } catch (err) {
        alert("Pengalaman gagal dihapus!");
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
        res = await axios.put(
          `/profiles/experiences/${formData._id}`,
          formData
        );
      } else {
        res = await axios.post("/profiles/experiences", formData);
      }
      setExperiences(res.data);
      alert("Pengalaman berhasil DiUpdate!");
    } catch (err) {
      alert("Error, gagal mengupdate pengalaman!");
      console.error(err);
    } finally {
      resetForm();
    }
  };

  useEffect(() => {
    if (profile) {
      setExperiences(profile.experiences);
    }
  }, [profile]);

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!profile) return <Error error={{ message: "No Profile Found!" }} />;

  return (
    <div className="grid gap-4 items-start xl:grid-cols-5 xl:grid-flow-row-dense">
      <CardSmall className="xl:col-span-2 xl:col-start-4">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-2xl text-yellow-600">
            Experience Form
          </h1>
          <p className="text-sm text-gray-500 mb-4">Update pengalaman anda</p>

          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Nama Perusahaan</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Nama formal sekolah..."
            />
          </div>
          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Bidang Usaha</label>
            <input
              type="text"
              name="field"
              value={formData.field}
              onChange={changeHandler}
              className="w-full block border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-gray-200 focus:shadow-inner focus:border-yellow-500"
              placeholder="Tingkat pendidikan"
            />
          </div>
          <div className="mb-4 text-sm text-gray-800">
            <label className="block font-semibold mb-2">Pekerjaan</label>
            <input
              type="text"
              name="job"
              value={formData.job}
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
              placeholder="Deskripsi singkat tentang pengalaman kerja anda ..."
            />
          </div>

          <div className="flex">
            <button
              type="reset"
              onClick={resetForm}
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
              <th className="px-2 py-2 pb-4">Nama Perusahaan</th>
              <th className="px-2 py-2 pb-4">Bidang Usaha</th>
              <th className="px-2 py-2 pb-4">Pekerjaan</th>
              <th className="px-2 py-2 pb-4">Waktu</th>
              <th className="px-2 py-2 pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience, index) => (
              <tr
                key={experience._id}
                className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-2 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border px-2 py-2 font-bold md:font-normal text-center md:text-left">
                  {experience.company}
                </td>
                <td className="border px-2 py-2 text-center">
                  {experience.field}
                </td>
                <td className="border px-2 py-2 text-center">
                  {experience.job}
                </td>
                <td className="border px-2 py-2 text-center whitespace-no-wrap">
                  {reverseNormalDate(experience.from)} ~{" "}
                  {!experience.isCurrently
                    ? reverseNormalDate(experience.to)
                    : "Sekarang"}
                </td>
                <td className="border px-2 py-1 text-center">
                  <div className="flex flex-wrap justify-center">
                    <button
                      onClick={(ev) => editExperience(experience)}
                      className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none mx-4 my-1 md:mx-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={(ev) => removeExperience(experience._id)}
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none mx-4 my-1 md:mx-2">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!experiences.length && (
              <tr>
                <td className="border px-2 py-2 text-center">0</td>
                <td className="border px-2 py-2 text-center" colSpan="4">
                  Silahkan tambahkan pengalaman anda!
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
