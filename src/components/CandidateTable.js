import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardExtraLarge, CardLarge, CardMini } from "./Card";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getUsers, deleteUser } from "../apis/users";
import {
  getCandidates,
  deleteCandidate,
  patchCandidate,
} from "../apis/candidates";

const statusColors = {
  open: "text-white bg-green-500 hover:bg-green-700",
  close: "text-black bg-gray-200 hover:bg-gray-400",
  pending: "text-black bg-yellow-400 hover:bg-yellow-600",
  accepted: "text-white bg-green-500 hover:bg-green-700",
  rejected: "text-white bg-red-500 hover:bg-red-700",
  hired: "text-white bg-blue-500 hover:bg-blue-700",
};

const showAction = (candidate, callback) => {
  switch (candidate.status) {
    case "pending":
      return (
        <>
          <button
            onClick={async (ev) => {
              if (
                window.confirm("Apakah anda yakin akan menerima kandidat ini ?")
              ) {
                if (
                  await patchCandidate({ status: "accepted" }, candidate._id)
                ) {
                  alert("Operasi berhasi!");
                } else {
                  alert("Operasi gagal!");
                }
              }
            }}
            className="rounded font-bold my-1 mx-1 text-white bg-green-500 hover:bg-green-600 py-1 px-2">
            Terima
          </button>
          <button
            onClick={async (ev) => {
              if (
                window.confirm("Apakah anda yakin akan menolak kandidat ini ?")
              ) {
                if (
                  await patchCandidate({ status: "rejected" }, candidate._id)
                ) {
                  alert("Operasi berhasi!");
                } else {
                  alert("Operasi gagal!");
                }
              }
            }}
            className="rounded font-bold my-1 mx-1 text-white bg-red-500 hover:bg-red-600 py-1 px-2">
            Tolak
          </button>
        </>
      );

    case "accepted":
      return (
        <button
          onClick={async (ev) => {
            if (
              window.confirm("Apakah anda yakin akan merekrut kandidat ini ?")
            ) {
              if (await patchCandidate({ status: "hired" }, candidate._id)) {
                alert("Operasi berhasi!");
              } else {
                alert("Operasi gagal!");
              }
            }
          }}
          className="rounded font-bold my-1 mx-1 text-white bg-blue-500 hover:bg-blue-600 py-1 px-2">
          Rekrut
        </button>
      );

    case "hired":
    case "rejected":
      return (
        <button
          onClick={async (ev) => {
            if (
              window.confirm("Apakah anda yakin akan menghapus kandidat ini ?")
            ) {
              if (await deleteCandidate(candidate._id)) {
                callback();
                alert("Operasi berhasi!");
              } else {
                alert("Operasi gagal!");
              }
            }
          }}
          className="rounded font-bold my-1 mx-1 text-white bg-red-500 hover:bg-red-600 py-1 px-2">
          Hapus
        </button>
      );

    default:
      break;
  }
};

export default function CandidateTable() {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const [filter, setFilter] = useState({
    status: "",
  });

  const queryObject = {};
  if (filter.status) queryObject.status = filter.status;
  if (dateRange.start && dateRange.end) {
    queryObject.dateRange = `${dateRange.start}:${dateRange.end}`;
  }

  const candidates = useQuery(
    [
      "candidates",
      {
        params: {
          ...queryObject,
        },
      },
    ],
    getCandidates
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  const changeDate = (ev) =>
    setDateRange({ ...dateRange, [ev.target.name]: ev.target.value });

  const resetDate = (ev) => {
    ev.preventDefault();
    setDateRange({ start: "", end: "" });
  };

  if (candidates.isLoading) return <Loader />;

  return (
    <>
      <CardMini className="w-full text-sm">
        <form className="flex items-center">
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none mr-4"
          />
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={changeDate}
            className="border px-2 py-1 rounded outline-none mr-4"
          />
          <button
            type="reset"
            onClick={resetDate}
            className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm focus:outline-none mr-4">
            Reset
          </button>
          <div className="ml-auto"></div>
          <select
            name="status"
            value={filter.status}
            onChange={changeFilter}
            className="border px-2 py-1 rounded outline-none ml-4">
            <option value="">Status Lamaran</option>
            <option value="pending">Ditunda</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
            <option value="hired">Direkrut</option>
          </select>
        </form>
      </CardMini>
      <CardExtraLarge className="overflow-x-auto">
        <div className="md:flex items-center mb-4">
          <h1 className="font-bold text-xl text-yellow-600 mb-4 md:mb-0">
            Tabel Calon Karyawan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/admin/users/create"
            className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm whitespace-no-wrap font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
            Tambah Calon Karyawan
          </Link>
          <a
            href="http://localhost:5000/candidates/print"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Report
          </a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border">NO.</th>
              <th className="py-2 px-4 border">Foto</th>
              <th className="py-2 px-4 border text-left">Nama Pelamar</th>
              <th className="py-2 px-4 border">Posisi Dilamar</th>
              <th className="py-2 px-4 border">Pendidikan Terakhir</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Tanggal Melamar</th>
              <th className="py-2 px-4 border">Detail</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.data &&
              candidates.data.map((candidate, index) => {
                let user = candidate.user ? candidate.user : {};
                let profile = user.profile ? candidate.user.profile : {};
                let recruitment = candidate.recruitment
                  ? candidate.recruitment
                  : {};
                let education = { school: "" };
                if (profile.educations && profile.educations.length > 0) {
                  education = profile.educations[profile.educations.length - 1];
                }
                console.log("Profile", candidate);
                return (
                  <tr key={candidate._id}>
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 border text-center w-24">
                      <img src={user.image} alt="profile" />
                    </td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border text-center">
                      [{recruitment.position.code}] {recruitment.position.name}
                    </td>
                    <td className="py-2 px-4 border text-center uppercase">
                      {education.school}
                    </td>
                    <td className="py-2 px-4 border text-center uppercase">
                      <span
                        className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                          statusColors[candidate.status]
                        }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border text-center uppercase">
                      {new Date(candidate.appliedAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center uppercase">
                      <Link
                        to={`/admin/candidates/${candidate._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                        <i className="fas fa-search"></i>
                      </Link>
                    </td>

                    <td className="py-1 px-4 border text-center">
                      {showAction(
                        candidate,
                        async () => await candidates.refetch()
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardExtraLarge>
    </>
  );
}
