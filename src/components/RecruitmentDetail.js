import React from "react";
import { CardExtraLarge, CardMini } from "./Card";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecruitments } from "../apis/recruitments";
import Loader from "./Loader";
import { localDate, calculateAge } from "../utils/time";
import { getCandidates } from "../apis/candidates";
import { useState } from "react";

const statusRecruitmentColors = {
  open: "text-white bg-green-500 hover:bg-green-700",
  pending: "text-black bg-yellow-400 hover:bg-yellow-600",
  close: "text-black bg-gray-200 hover:bg-gray-400",
};

const statusCandidateColors = {
  pending: "text-black bg-yellow-400 hover:bg-yellow-600",
  accepted: "text-white bg-green-500 hover:bg-green-700",
  rejected: "text-black bg-red-500 hover:bg-red-700",
  hired: "text-black bg-blue-500 hover:bg-blue-700",
};

export default function RecruitmentDetail() {
  const params = useParams();
  const [filter, setFilter] = useState({
    status: "",
  });

  const query = {};
  if (filter.status) query.status = filter.status;

  const recruitmentQuery = useQuery(
    [
      "recruitment",
      {
        endpoint: params.recruitmentId,
      },
    ],
    getRecruitments
  );

  const candidates = useQuery(
    [
      "candidates",
      {
        params: {
          recruitment: params.recruitmentId,
          ...query,
        },
      },
    ],
    getCandidates
  );

  const changeFilter = (ev) =>
    setFilter({ ...filter, [ev.target.name]: ev.target.value });

  if (recruitmentQuery.isLoading || candidates.isLoading) return <Loader />;
  const recruitment = recruitmentQuery.data;
  const position = recruitment.position ? recruitment.position : {};
  // const department = recruitment.department ? recruitment.department : {};
  console.log(position);

  return (
    <>
      <CardExtraLarge>
        <div className="flex mb-4 items-center">
          <h1 className="text-xl text-yellow-600 font-bold">
            Detail Penerimaan
          </h1>
          <div className="ml-auto"></div>
          <a
            href={`http://localhost:5000/recruitments/${recruitment._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <table className="w-full text-sm mb-4">
          <tbody>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Judul
              </th>
              <td className="px-4 py-2 border">{recruitment.title}</td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Posisi Diperlukan
              </th>
              <td className="px-4 py-2 border">
                [{position.code}] {position.name}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Jumlah Diperlukan
              </th>
              <td className="px-4 py-2 border">{recruitment.numberRequired}</td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Jumlah Pelamar
              </th>
              <td className="px-4 py-2 border">
                {recruitment.pending +
                  recruitment.rejected +
                  recruitment.accepted +
                  recruitment.hired}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Tanggal Dibuat
              </th>
              <td className="px-4 py-2 border">
                {localDate(recruitment.createdAt)}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Tanggal Deadline
              </th>
              <td className="px-4 py-2 border">
                {localDate(recruitment.expiredAt)}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="px-4 py-2 border text-left md:w-1/4 whitespace-no-wrap">
                Status Penerimaan
              </th>
              <td className="px-4 py-2 border">
                <span
                  to="/candidates"
                  className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                    statusRecruitmentColors[recruitment.status]
                  }`}>
                  {recruitment.status}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <th className="px-4 py-2 border text-left" colSpan="2">
                Persyaratan:
              </th>
            </tr>
            {recruitment.requirements &&
              recruitment.requirements.map((requirement, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center w-2">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border text-left">{requirement}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <th className="px-4 py-2 border text-left">Keterangan:</th>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-left">
                {recruitment.description}
              </td>
            </tr>
          </tbody>
        </table>
      </CardExtraLarge>
      <CardMini className="w-full flex items-center">
        <select
          name="status"
          value={filter.status}
          onChange={changeFilter}
          className="outline-none px-2 py-1 border text-sm rounded bg-gray-100 focus:bg-white ml-4">
          <option value="">Status Lamaran</option>
          <option value="pending">Pending</option>
          <option value="accepted">Diterima</option>
          <option value="rejected">Ditolak</option>
          <option value="hired">Direkrut</option>
        </select>
        <div className="ml-auto"></div>
      </CardMini>
      <CardExtraLarge>
        <div className="flex mb-4 items-center">
          <h1 className="text-xl font-bold text-yellow-600">Tabel Pelamar</h1>
          <div className="ml-4"></div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="hidden md:table-row">
              <th className="border px-4 py-2 w-2">NO.</th>
              <th className="border px-4 py-2">Foto</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Umur</th>
              <th className="border px-4 py-2">Pendidikan Terakhir</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {candidates.data &&
              candidates.data.map((candidate, index) => {
                const profile = candidate.user.profile
                  ? candidate.user.profile
                  : {};
                const educationCount = profile.educations
                  ? profile.educations.length
                  : 0;

                let lastEducation = {};
                if (educationCount > 0) {
                  lastEducation = profile.educations[educationCount - 1];
                }

                return (
                  <tr
                    key={candidate._id}
                    className="grid mb-4 md:mb-0 md:table-row">
                    <td className="border px-4 py-2 md:text-center hidden md:table-cell">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      foto
                    </td>
                    <td className="border px-4 py-2 text-center font-bold md:text-left md:font-normal">
                      {candidate.user.name}
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      {candidate.user.email}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {calculateAge(profile.birthDate)} tahun
                    </td>
                    <td className="border px-4 py-2 text-center md:text-left">
                      {lastEducation.school}
                    </td>
                    <td className="border px-4 py-2 text-center uppercase">
                      <span
                        className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                          statusCandidateColors[candidate.status]
                        }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <Link
                        to={`/admin/candidates/${candidate._id}/?backLink=/admin/recruitments/${recruitment._id}`}
                        className="inline-block rounded font-bold text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 mr-2">
                        <i className="fas fa-search"></i>
                      </Link>
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
