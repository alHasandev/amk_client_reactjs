import React, { useState } from "react";
import { CardSmall } from "./Card";
import Container from "../layout/Container";
import { Link, Redirect } from "react-router-dom";
import { useAxiosGet, useAxios } from "../hooks/request";
import Loader from "./Loader";
import Error from "./Error";
import { normalDate } from "../utils/time";

export default function RecruitmentForm() {
  const [res, status, method] = useAxios("/recruitments");

  const [positions, isLoading, error] = useAxiosGet("/positions");
  const [formData, setFormData] = useState({
    title: "",
    positionName: "",
    numberRequired: 1,
    description: "",
    expiredAt: normalDate(new Date()),
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(formData);
    method.save(formData);
  };

  if (error) return <Error error={error} />;
  if (status === "error" && !!res) return <Error error={res} />;
  if (isLoading || status === "requesting") return <Loader />;
  if (!positions)
    return <Error error={{ message: "No Position Available!" }} />;

  if (status === "success" && !!res)
    return <Redirect to="/admin/recruitments" />;

  return (
    <Container>
      <CardSmall>
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-yellow-600 text-2xl">
            Recruitment Form
          </h1>
          <p className="text-gray-500 text-sm mb-4">Create new recruitment</p>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              placeholder="Recruitment title..."
              className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:shadow-inner focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">
              Position
            </label>
            <select
              name="positionName"
              value={formData.positionName}
              onChange={changeHandler}
              className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600">
              <option value="">Choose position recruited</option>
              {positions.map((position) => (
                <option key={position._id} value={position.name}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">
              Number Required
            </label>
            <input
              type="number"
              name="numberRequired"
              value={formData.numberRequired}
              onChange={changeHandler}
              placeholder="Number required..."
              className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:shadow-inner focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">
              Expired At ?
            </label>
            <input
              type="date"
              name="expiredAt"
              value={formData.expiredAt}
              onChange={changeHandler}
              className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:shadow-inner focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={changeHandler}
              className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:shadow-inner focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600"
              rows="3"
              placeholder="Describe new recruitment..."
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="inline-block font-semibold px-4 py-2 rounded-sm shadow-sm bg-yellow-400 text-black hover:bg-yellow-600 hover:text-white focus:outline-none">
              Save
            </button>
            <Link
              to="/admin/recruitments"
              className="inline-block font-semibold px-4 py-2 rounded-sm shadow-sm bg-gray-400 text-black hover:bg-gray-500 hover:text-white focus:outline-none mr-4">
              Cancel
            </Link>
          </div>
        </form>
      </CardSmall>
    </Container>
  );
}
