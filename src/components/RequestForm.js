import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { useQuery } from "react-query";
import { ChooseOne } from "./ChooseOne";
import { useHistory, useParams } from "react-router-dom";
import { getEmployees } from "../apis/employees";
import { patchRequest, postRequest, getRequests } from "../apis/requests";

export default function RequestForm() {
  const params = useParams();
  const history = useHistory();
  const employees = useQuery("employees", getEmployees);

  const [formData, setFormData] = useState({
    from: "",
    message: "",
    status: "pending",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);

    const { _id, ...data } = formData;

    if (formData._id) {
      if (
        await patchRequest(data, {
          endpoint: params.requestId,
        })
      ) {
        alert("Berhasil memperbaharui request!");
        history.push("/admin/requests");
      } else {
        alert("Gagal memperbaharui request!");
      }
    } else {
      if (await postRequest(data)) {
        alert("Berhasil menambah request!");
        history.push("/admin/requests");
      } else {
        alert("Gagal menambahkan request!");
      }
    }
  };

  useEffect(() => {
    if (params.requestId) {
      getRequests("request", {
        endpoint: params.requestId,
      }).then((data) =>
        setFormData({
          _id: data._id,
          from: data.from ? data.from._id : "",
          message: data.message,
          status: data.status,
        })
      );
    }
  }, [params.requestId]);

  console.log(formData);
  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-2xl text-yellow-600">Request Form</h1>
        <p className="text-sm text-gray-500 mb-4">Create or Update Request</p>

        <div className="mb-4 text-sm">
          <label className="block mb-2 font-semibold">Dari</label>
          <select
            name="from"
            value={formData.from}
            onChange={changeHandler}
            className="w-full px-4 py-2 rounded bg-gray-100 border hover:border-yellow-600 focus:border-yellow-600 focus:bg-white focus:outline-none">
            <option value="">Pilih Karyawan</option>
            {employees.data &&
              employees.data.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.position.name} - {employee.user.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4 text-sm">
          <label className="block mb-2 font-semibold">Detail Permintaan</label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={changeHandler}
            className="w-full px-4 py-2 rounded bg-gray-100 border hover:border-yellow-600 focus:border-yellow-600 focus:shadow-inner focus:outline-none"
            placeholder="Detail / keterangan / pesan ..."
          />
        </div>

        <div className="mb-4 text-sm">
          <label className="block mb-2 font-semibold">Status</label>
          <ChooseOne
            name="status"
            choices={[
              {
                value: "pending",
                activeClassName: "bg-yellow-600 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "Pending",
              },
              {
                value: "rejected",
                activeClassName: "bg-red-500 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "Reject",
              },
              {
                value: "accepted",
                activeClassName: "bg-green-500 text-white",
                className: "bg-gray-200 text-gray-700",
                label: "Accept",
              },
            ]}
            value={formData.status}
            onChange={changeHandler}
          />
        </div>

        <div className="flex">
          <div className="ml-auto"></div>
          <button
            type="submit"
            className="inline-block px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Kirim
          </button>
        </div>
      </form>
    </CardSmall>
  );
}
