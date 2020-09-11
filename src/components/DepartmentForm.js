import React, { useState, useEffect } from "react";
import Container from "../layout/Container";
import { CardSmall } from "./Card";
import { Link, Redirect, useParams, useHistory } from "react-router-dom";
import { useAxios } from "../hooks/request";
import Loader from "./Loader";
import Error from "./Error";
import {
  getDepartments,
  postDepartment,
  patchDepartment,
} from "../apis/departments";

export default function DepartmentForm() {
  const history = useHistory();
  const params = useParams();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);
    if (formData._id) {
      if (
        await patchDepartment(formData, {
          endpoint: params.departmentId,
        })
      ) {
        alert("Berhasil mengupdate department!");
        history.push("/admin/departments");
      } else {
        alert("Gagal mengupdate department!");
      }
    } else {
      if (await postDepartment(formData)) {
        alert("Berhasil menambahkan department baru!");
        history.push("/admin/departments");
      } else {
        alert("Gagal menambahkan department baru!");
      }
    }
  };

  useEffect(() => {
    if (params.departmentId) {
      getDepartments("departments", {
        endpoint: params.departmentId,
      }).then((data) =>
        setFormData({
          _id: data._id,
          code: data.code,
          name: data.name,
          description: data.description,
        })
      );
    }
  }, []);

  return (
    <Container>
      <CardSmall>
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-yellow-700 text-2xl">
            Department Form
          </h1>
          <p className="text-gray-500 text-sm mb-4">Create new department</p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="">
              <label className="block mb-2 font-bold text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
                placeholder="Department code..."
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-bold text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
                placeholder="Department name..."
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={changeHandler}
              className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
              rows="3"
              placeholder="Describe newly created department..."
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="inline-block bg-yellow-400 text-black font-semibold px-4 py-2 rounded-sm shadow-sm hover:bg-yellow-600 hover:text-white focus:outline-none">
              Save
            </button>
            <Link
              to="/admin/departments"
              className="inline-block bg-gray-400 text-black font-semibold px-4 py-2 rounded-sm shadow-sm hover:bg-gray-500 hover:text-white focus:outline-none mr-4">
              Cancel
            </Link>
          </div>
        </form>
      </CardSmall>
    </Container>
  );
}
