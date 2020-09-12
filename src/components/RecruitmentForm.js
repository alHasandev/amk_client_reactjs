import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { Link, useParams, useHistory } from "react-router-dom";
import Loader from "./Loader";
import { normalDate } from "../utils/time";
import { useQuery } from "react-query";
import { getPositions } from "../apis/positions";
import { ChooseOne } from "./ChooseOne";
import {
  postRecruitment,
  patchRecruitment,
  getRecruitments,
} from "../apis/recruitments";

export default function RecruitmentForm() {
  const params = useParams();
  const history = useHistory();
  const positions = useQuery("positions", getPositions);

  const [requirement, setRequirement] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    positionId: "",
    numberRequired: 1,
    requirements: [],
    description: "",
    status: "pending",
    expiredAt: normalDate(new Date()),
  });

  const addRequirement = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirement],
      });
      setRequirement("");
    }
  };

  const removeRequirement = (index) => {
    let requirements = formData.requirements;
    requirements.splice(index, 1);
    setFormData({ ...formData, requirements: requirements });
    console.log(requirements);
  };

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);
    if (params.recruitmentId) {
      const { requirements, ...data } = formData;
      if (
        await patchRecruitment(
          { requirements: requirements.join(";"), ...data },
          {
            endpoint: params.recruitmentId,
          }
        )
      ) {
        alert("Berhasil mengupdate recruitment!");
        return history.push("/admin/recruitments");
      } else {
        alert("Gagal mengupdate recruitment!");
      }
    } else {
      let { requirements, ...data } = formData;
      requirements = requirements.join(";");
      if (await postRecruitment({ requirements, ...data })) {
        alert("Berhasil menambah recruitment!");
        return history.push("/admin/recruitments");
      } else {
        alert("Gagal menambah recruitment!");
      }
    }
  };

  useEffect(() => {
    if (params.recruitmentId) {
      getRecruitments("recruitment", {
        endpoint: params.recruitmentId,
      }).then((data) =>
        setFormData({
          title: data.title,
          positionId: data.positionId,
          numberRequired: data.numberRequired,
          requirements: data.requirements ? data.requirements : [],
          description: data.description,
          status: data.status,
          expiredAt: normalDate(data.expiredAt),
        })
      );
    }
  }, [params.recruitmentId]);

  if (positions.isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-yellow-600 text-2xl">Recruitment Form</h1>
        <p className="text-gray-500 text-sm mb-4">Create new recruitment</p>

        <div className="mb-4 text-sm">
          <label className="block mb-2 font-semibold">Status</label>
          <ChooseOne
            name="status"
            choices={[
              {
                value: "pending",
                activeClassName: "bg-yellow-600 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "PENDING",
              },
              {
                value: "open",
                activeClassName: "bg-green-500 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "OPEN",
              },
              {
                value: "close",
                activeClassName: "bg-gray-500 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "CLOSE",
              },
            ]}
            value={formData.status}
            onChange={changeHandler}
          />
        </div>

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
          <label className="block font-bold text-gray-700 mb-2">Position</label>
          <select
            name="positionId"
            value={formData.positionId}
            onChange={changeHandler}
            className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600">
            <option value="">Choose position recruited</option>
            {positions.data &&
              positions.data.map((position) => (
                <option key={position._id} value={position._id}>
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
            Persyartan ?
          </label>
          <input
            type="text"
            name="requirement"
            value={requirement}
            onChange={(ev) => setRequirement(ev.target.value)}
            onKeyDown={addRequirement}
            className="w-full text-sm px-4 py-2 border border-gray-400 rounded focus:shadow-inner focus:outline-none focus:bg-gray-100 focus:border-yellow-600 hover:border-yellow-600 mb-2"
            placeholder="Enter untuk menambahkan persyaratan..."
          />

          <table className="w-full text-sm">
            <tbody>
              {formData.requirements.map((requirement, index) => (
                <tr key={index} className="border-b">
                  <td className="px-2 py-2 w-2">{index + 1}</td>
                  <td className="px-2 py-2 w-full">{requirement}</td>
                  <td className="px-2 py-2">
                    <button
                      type="button"
                      onClick={(ev) => removeRequirement(index)}
                      className="inline-block rounded font-bold bg-red-500 hover:bg-red-600 text-white text-xs px-2">
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            {formData._id ? "Update" : "Save"}
          </button>
          <Link
            to="/admin/recruitments"
            className="inline-block font-semibold px-4 py-2 rounded-sm shadow-sm bg-gray-400 text-black hover:bg-gray-500 hover:text-white focus:outline-none mr-4">
            Cancel
          </Link>
        </div>
      </form>
    </CardSmall>
  );
}
