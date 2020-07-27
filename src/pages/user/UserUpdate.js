import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAxiosGet, useAxios } from "../../hooks/request";
import { CardSmall } from "../../components/Card";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

export default function UserUpdate() {
  const [res, status, api] = useAxios("/users/me");
  const [user, isLoading, error] = useAxiosGet("/users/me");

  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    email: "",
    password: "",
    image: "default.png",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(formData);
    api.update(formData);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        nik: user.nik,
        name: user.name,
        email: user.email,
        image: user.image,
        password: "",
      });
    }
  }, [user]);

  if (error || (status === "error" && !!res))
    return <Error error={error || res} />;
  if (isLoading || status === "requesting") return <Loader />;
  if (!user) return <Error error={{ message: "User not found!" }} />;
  if (status === "success" && !!res) return <Redirect to="/user/profile" />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-yellow-600 text-2xl">Update User</h1>
        <p className="text-gray-500 text-sm mb-4">Update Your User Setting</p>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">NIK</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="NIK anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="User name..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="User @email..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="User *password..."
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
