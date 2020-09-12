import React, { useEffect } from "react";
import { CardSmall } from "./Card";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { postUser, getUsers, patchUser } from "../apis/users";
import { ChooseOne } from "./ChooseOne";
import Loader from "./Loader";

export default function UserForm() {
  const params = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    email: "",
    password: "",
    image: "",
    privilege: "",
    isActive: true,
  });

  // Get upload image element
  const inputImage = useRef(null);

  const backPage = () => {
    history.push("/admin/users");
  };

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const changeIsActive = (ev) => {
    let isActive = ev.target.value === "true" ? true : false;
    setFormData({ ...formData, isActive });
  };

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);
    console.log(inputImage.current.files[0]);

    // Build form data
    const formBuild = new FormData();
    formBuild.append("nik", formData.nik);
    formBuild.append("name", formData.name);
    formBuild.append("email", formData.email);
    formBuild.append("password", formData.password);
    formBuild.append("privilege", formData.privilege);
    formBuild.append("isActive", formData.isActive);
    if (inputImage.current.files.length > 0)
      formBuild.append("image", inputImage.current.files[0], formData.nik);

    if (!formData._id) {
      setIsLoading(true);
      if (
        await postUser(formBuild, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ) {
        setIsLoading(false);
        alert("Berhasil menambah user");
        console.log(formBuild);
        history.push("/admin/users");
      } else {
        setIsLoading(false);
        alert("Gagal menambah user");
        console.log(formBuild);
      }
    } else {
      setIsLoading(true);
      if (
        await patchUser(formBuild, {
          endpoint: formData._id,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ) {
        setIsLoading(false);
        alert("Berhasil mengupdate user");
        console.log(formBuild);
        history.push("/admin/users");
      } else {
        setIsLoading(false);
        alert("Gagal mengupdate user");
        console.log(formBuild);
      }
    }
  };

  useEffect(() => {
    if (params.userId) {
      getUsers("user", {
        endpoint: params.userId,
      }).then((data) => {
        setFormData({
          _id: data._id,
          nik: data.nik,
          name: data.name,
          email: data.email,
          privilege: data.privilege,
          isActive: data.isActive,
          password: "",
        });
      });
    }
  }, [params.userId]);

  if (isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <h1 className="font-bold text-yellow-600 text-2xl">User Form</h1>
        <p className="text-gray-500 text-sm mb-4">Create new user</p>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Aktif ?</label>
          <ChooseOne
            name="isActive"
            value={formData.isActive}
            onChange={changeIsActive}
            choices={[
              {
                value: true,
                label: "YES",
                className: "",
                activeClassName: "bg-green-500 text-white",
              },
              {
                value: false,
                label: "NO",
                className: "",
                activeClassName: "bg-red-500 text-white",
              },
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">NIK</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={changeHandler}
            className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Same as your national id card's id..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
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
            className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
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
            className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="User *password..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-gray-700 mb-2">Image</label>
          <input
            type="file"
            name="image"
            ref={inputImage}
            className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Hak Akses
          </label>
          <select
            name="privilege"
            value={formData.privilege}
            onChange={changeHandler}
            className="w-full block text-sm border outline-none px-4 py-2 rounded bg-gray-100 hover:border-yellow-500 focus:bg-white">
            <option value="">Pilih Hak Akses</option>
            <option value="user">Umum/Tamu</option>
            <option value="candidate">Calon Karyawan</option>
            <option value="employee">Karyawan</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex">
          <div className="ml-auto"></div>
          <button
            type="reset"
            onClick={backPage}
            className="inline-block px-4 py-2 rounded-sm shadow-sm bg-yellow-600 text-black font-semibold hover:bg-yellow-700">
            Cancel
          </button>
          <button
            type="submit"
            className="inline-block px-4 py-2 rounded-sm shadow-sm bg-yellow-400 text-black font-semibold hover:bg-yellow-500 ml-4">
            Save
          </button>
        </div>
      </form>
    </CardSmall>
  );
}
