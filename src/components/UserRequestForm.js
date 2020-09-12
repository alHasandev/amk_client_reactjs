import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { useHistory, useParams } from "react-router-dom";
import { patchRequest, postRequest, getRequests } from "../apis/requests";

export default function UserRequestForm() {
  const params = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    message: "",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);

    if (params.requestId) {
      if (
        await patchRequest(formData, {
          endpoint: params.requestId,
        })
      ) {
        alert("Berhasil memperbaharui permintaan!!");
        return history.push("/user/requests");
      } else {
        alert("Gagal memperbaharui permintaan!!");
      }
    } else {
      if (
        await postRequest(formData, {
          endpoint: "me",
        })
      ) {
        alert("Berhasil menambahkan permintaan baru!!");
        return history.push("/user/requests");
      } else {
        alert("Gagal menambahkan permintaan baru!");
      }
    }
  };

  useEffect(() => {
    if (params.requestId) {
      const options = {
        endpoint: params.requestId,
      };

      getRequests("request", options).then((data) =>
        setFormData({
          message: data.message,
        })
      );
    }
  }, [params.requestId]);

  console.log(formData);
  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-2xl text-yellow-600">Form Permintaan</h1>
        <p className="text-sm text-gray-500 mb-4">
          Tambah atau Edit Permintaan
        </p>

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
