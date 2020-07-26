import React, { useState } from "react";
import Container from "../layout/Container";
import { CardSmall } from "./Card";
import { Link, useParams, Redirect } from "react-router-dom";
import { useAxiosGet, useAxios } from "../hooks/request";
import Loader from "./Loader";
import Error from "./Error";

export default function PositionForm() {
  const params = useParams();
  const [department, isDeptLoading, deptError] = useAxiosGet(
    `/departments/${params.id}`
  );
  const [res, status, method] = useAxios(`/departments/${params.id}/position`);

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    level: "",
    salary: 0,
    description: "",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(formData);
    method.save(formData);
  };

  if (deptError) return <Error error={deptError} />;
  if (isDeptLoading || status === "requesting") return <Loader />;
  if (!department)
    return <Error error={{ message: "Department not defined" }} />;

  if (status === "error" && !!res) return <Error error={res} />;
  if (status === "success" && !!res)
    return <Redirect to={`/admin/departments/${params.id}`} />;

  return (
    <Container>
      <CardSmall>
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-yellow-700 text-2xl">Position Form</h1>
          <p className="text-gray-500 text-sm mb-4">
            Create new position in department
          </p>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">
              Department
            </label>
            <div className="w-full px-4 py-2 rounded border border-gray-400 bg-gray-100 text-sm text-gray-700">
              {department.name}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="">
              <label className="block mb-2 font-bold text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
                placeholder="Position code..."
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-bold text-gray-700">
                Position Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
                placeholder="Position name..."
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="">
              <label className="block mb-2 font-bold text-gray-700">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100">
                <option value="">Choose level</option>
                <option value="intern">Intern</option>
                <option value="trainee">Trainee</option>
                <option value="staff">Staff</option>
                <option value="dept. head">Dept Head</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2 font-bold text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={changeHandler}
                className="w-full px-4 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:bg-gray-100 focus:shadow-inner"
                placeholder="Position salary..."
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
