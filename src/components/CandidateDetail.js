import React, { useEffect } from "react";
import { CardLarge } from "./Card";
import { useQuery } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { getCandidates, patchCandidate } from "../apis/candidates";
import Loader from "./Loader";
import time from "../utils/time";
import { useState } from "react";
import { backLink } from "../utils/url";

export default function CandidateDetail() {
  const params = useParams();
  const history = useHistory();

  const candidateQuery = useQuery(
    [
      "candidate",
      {
        endpoint: params.candidateId,
      },
    ],
    getCandidates
  );

  const [formData, setFormData] = useState({
    status: "",
    comment: "",
  });

  const changeHandler = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log(formData);

    if (
      await patchCandidate(formData, {
        endpoint: params.candidateId,
      })
    ) {
      alert("Berhasil mengupdate form lamaran !!");
      history.push(backLink("/admin/candidates"));
    } else {
      alert("Gagal mengupdate form lamaran !!");
    }
  };

  useEffect(() => {
    if (candidateQuery.data) {
      setFormData({
        status: candidateQuery.data.status,
        comment: candidateQuery.data.comment,
      });
    }
  }, [candidateQuery.data]);

  if (candidateQuery.isLoading) return <Loader />;
  const candidate = candidateQuery.data;
  const recruitment = candidate.recruitment ? candidate.recruitment : {};
  const user = candidate.user ? candidate.user : {};
  const profile = user.profile ? user.profile : {};
  const skills = profile.skills ? profile.skills : [];

  return (
    <>
      <CardLarge className="w-full max-w-screen-lg">
        <div className="flex items-center mb-4">
          <h1 className="text-xl text-yellow-600 font-bold">Form Lamaran</h1>
          <div className="ml-auto"></div>
          <a
            href={`${process.env.REACT_APP_SERVER_LINK}/candidates/print/${candidate._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
            Cetak
          </a>
        </div>
        <form onSubmit={submitHandler}>
          <table className="w-full text-sm mb-4">
            <tbody>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Posisi Dilamar
                </th>
                <td className="border px-4 py-2 text-left">
                  [{recruitment.department.code}] {recruitment.department.name},
                  [{recruitment.position.code}] {recruitment.position.name}
                </td>
              </tr>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Tanggal Melamar
                </th>
                <td className="border px-4 py-2 text-left">
                  {time.getDateString(candidate.appliedAt)}
                </td>
              </tr>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Status Lamaran
                </th>
                <td className="border px-2 py-1 text-left">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={changeHandler}
                    className="w-full px-2 py-1 border outline-none">
                    <option value="">Status Lamaran</option>
                    <option value="pending">Ditunda</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                    <option value="hired">Direkrut</option>
                  </select>
                </td>
              </tr>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64 align-top">
                  Komentar
                </th>
                <td className="border px-2 py-1 text-left">
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={changeHandler}
                    className="w-full border px-2 py-1 outline-none"
                    rows="3"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex">
            <div className="ml-auto"></div>
            <button
              type="submit"
              className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
              Update
            </button>
          </div>
        </form>
      </CardLarge>
      <CardLarge>
        <div className="flex flex-wrap mb-4">
          <h1 className="text-xl font-bold text-yellow-600">
            Detail Pelamar Kerja
          </h1>
          <div className="ml-auto"></div>
        </div>
        <div className="flex items-center md:items-end flex-col md:flex-row-reverse">
          <div className="border mb-4 md:ml-4 md:mb-0 max-w-xs md:w-64 px-4 py-2">
            <img src={user.image} alt="profile" />
          </div>
          <div className="w-full">
            <table className="w-full text-sm">
              <tbody>
                <tr className="grid mb-4 md:table-row">
                  <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                    NIK
                  </th>
                  <td className="border px-4 py-2 text-left">{user.nik}</td>
                </tr>
                <tr className="grid mb-4 md:table-row">
                  <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                    Nama Pelamar
                  </th>
                  <td className="border px-4 py-2 text-left">{user.name}</td>
                </tr>
                <tr className="grid mb-4 md:table-row">
                  <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                    No Kontak
                  </th>
                  <td className="border px-4 py-2 text-left">
                    {profile.contact}
                  </td>
                </tr>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                    Email
                  </th>
                  <td className="border px-4 py-2 text-left">{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardLarge>
      <CardLarge>
        <table className="w-full text-sm">
          <tbody>
            <tr className="grid mb-4 md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Tempat, Tanggal Lahir
              </th>
              <td className="border px-4 py-2 text-left">
                {profile.birthPlace}, {profile.birthDate}
              </td>
            </tr>
            <tr className="grid mb-4 md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Alamat
              </th>
              <td className="border px-4 py-2 text-left">{profile.address}</td>
            </tr>
            <tr className="grid mb-4 md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Jenis Kelamin
              </th>
              <td className="border px-4 py-2 text-left">{profile.gender}</td>
            </tr>
            <tr className="grid md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Agama
              </th>
              <td className="border px-4 py-2 text-left">{profile.religion}</td>
            </tr>
            <tr className="grid md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Status Perkawinan
              </th>
              <td className="border px-4 py-2 text-left">
                {profile.maritalStatus}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Kewarganegaraan
              </th>
              <td className="border px-4 py-2 text-left">
                {profile.nationality}
              </td>
            </tr>
            <tr className="grid md:table-row">
              <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                Keahlian
              </th>
              <td className="border px-4 py-2 text-left">
                {skills.join(", ")}
              </td>
            </tr>
          </tbody>
        </table>
      </CardLarge>
      <CardLarge className="overflow-x-auto">
        <div className="flex flex-wrap mb-4">
          <h1 className="text-lg text-yellow-600 font-semibold">
            Riwayat Pendidikan
          </h1>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">Tahun</th>
                <th className="border px-4 py-2 text-left">Nama Sekolah</th>
                <th className="border px-4 py-2 text-center">Jurusan</th>
                <th className="border px-4 py-2 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {profile.educations &&
                profile.educations.map((education) => {
                  return (
                    <tr key={education._id}>
                      <td className="border px-4 py-2 text-center">
                        {time.year(education.from)} -{" "}
                        {education.isCurrently
                          ? "Sekarang"
                          : time.year(education.to)}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {education.school}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {education.major}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {education.description}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </CardLarge>
      <CardLarge className="overflow-x-auto">
        <div className="flex flex-wrap mb-4">
          <h1 className="text-lg text-yellow-600 font-semibold">
            Riwayat Pengalaman
          </h1>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">Tahun</th>
                <th className="border px-4 py-2 text-left">Nama Perusahaan</th>
                <th className="border px-4 py-2 text-center">Jabatan</th>
                <th className="border px-4 py-2 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {profile.experiences &&
                profile.experiences.map((experience) => {
                  return (
                    <tr key={experience._id}>
                      <td className="border px-4 py-2 text-center">
                        {time.year(experience.from)} -{" "}
                        {experience.isCurrently
                          ? "Sekarang"
                          : time.year(experience.to)}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {experience.company}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {experience.job}
                      </td>
                      <td className="border px-4 py-2 text-left">
                        {experience.description}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </CardLarge>
    </>
  );
}
