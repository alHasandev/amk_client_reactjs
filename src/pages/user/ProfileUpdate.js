import React, { useState, useEffect } from "react";
import { CardSmall } from "../../components/Card";
import { Link, Redirect } from "react-router-dom";
import { useAxiosGet, useAxios } from "../../hooks/request";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { normalDate } from "../../utils/time";
import { ChooseOne } from "../../components/ChooseOne";

const genders = [
  {
    value: "Laki-Laki",
    className: "bg-gray-200 text-black",
    activeClassName: "bg-yellow-600 text-white",
    label: "Laki-Laki",
  },
  {
    value: "Perempuan",
    className: "bg-gray-200 text-black",
    activeClassName: "bg-yellow-400 text-black",
    label: "Perempuan",
  },
];

export default function ProfileUpdate() {
  const [res, status, api] = useAxios("/profiles");
  const [profile, isLoading, error] = useAxiosGet("/profiles/me");

  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    birthPlace: "",
    birthDate: "",
    skills: "",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(formData);
    api.save(formData);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio,
        gender: profile.gender,
        birthPlace: profile.birthPlace,
        birthDate: normalDate(profile.birthDate),
        skills: profile.skills.join(", "),
      });
    }
  }, [profile]);

  if (status === "error" && !!res) return <Error error={res} />;
  if (isLoading || status === "requesting") return <Loader />;
  if (status === "success" && !!res) return <Redirect to="/user/profile" />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-yellow-600 text-2xl">Update Profile</h1>
        <p className="text-gray-500 text-sm mb-4">Update Profile Kamu</p>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Deskripsikan tentang diri anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">
            Jenis Kelamin
          </label>
          <ChooseOne
            name="gender"
            value={formData.gender}
            choices={genders}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">
            Tempat, Tanggal Lahir
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={changeHandler}
              className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="Tempat lahir anda..."
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={changeHandler}
              className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-bold text-gray-700 mb-2">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Keahlian anda dipisahkan dengan koma (,), ex: skill 1, skill 2, skill 3, ..."
          />
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="submit"
            className="inline-block bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white rounded-sm font-semibold px-4 py-2">
            Save
          </button>
          <Link
            to="/admin/users"
            className="inline-block bg-gray-400 text-black hover:bg-gray-600 hover:text-white rounded-sm font-semibold px-4 py-2 mr-4">
            Cancel
          </Link>
        </div>
      </form>
    </CardSmall>
  );
}
