import React, { useEffect } from "react";
import { CardMedium, CardLarge, CardExtraLarge, CardMini } from "./Card";
import { profile as profileImage } from "../assets";
import { useQuery } from "react-query";
import { useParams, useHistory, Link } from "react-router-dom";
import { getCandidates, patchCandidate } from "../apis/candidates";
import Loader from "./Loader";
import time from "../utils/time";
import { useState } from "react";
import { backLink } from "../utils/url";
import { getUsers } from "../apis/users";
import { getEmployees } from "../apis/employees";
import { IDR } from "../utils/currency";

const statusCandidateColors = {
  pending: "text-black bg-yellow-400 hover:bg-yellow-600",
  accepted: "text-white bg-green-500 hover:bg-green-700",
  rejected: "text-white bg-red-500 hover:bg-red-700",
  hired: "text-white bg-blue-500 hover:bg-blue-700",
};

export default function UserProfile() {
  const userQuery = useQuery(
    [
      "user",
      {
        endpoint: "me",
      },
    ],
    getUsers
  );

  const candidateQuery = useQuery(
    [
      "candidate",
      {
        endpoint: "me",
      },
    ],
    getCandidates
  );

  const employeeQuery = useQuery(
    [
      "employee",
      {
        endpoint: "me",
      },
    ],
    getEmployees
  );

  if (
    userQuery.isLoading ||
    candidateQuery.isLoading ||
    employeeQuery.isLoading
  )
    return <Loader />;
  const user = userQuery.data;
  const candidate = candidateQuery.data ? candidateQuery.data : {};
  const employee = employeeQuery.data ? employeeQuery.data : {};

  const profile = user.profile ? user.profile : {};
  const skills = profile.skills ? profile.skills : [];

  const recruitment = candidate.recruitment ? candidate.recruitment : {};

  return (
    <>
      {candidateQuery.data && (
        <CardLarge className="w-full max-w-screen-lg">
          <div className="flex items-center mb-4">
            <h1 className="text-xl text-yellow-600 font-bold">Form Lamaran</h1>
            <div className="ml-auto"></div>
            <a
              href={`http://localhost:5000/candidates/print/${candidate._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
              Cetak
            </a>
          </div>
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
                <td className="border px-4 py-2 text-left">
                  <span
                    className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                      statusCandidateColors[candidate.status]
                    }`}>
                    {candidate.status}
                  </span>
                </td>
              </tr>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64 align-top">
                  Komentar
                </th>
                <td className="border px-4 py-2 text-left">
                  {candidate.comment}
                </td>
              </tr>
            </tbody>
          </table>
        </CardLarge>
      )}
      {employeeQuery.data && (
        <CardLarge className="w-full max-w-screen-lg">
          <div className="flex items-center mb-4">
            <h1 className="text-xl text-yellow-600 font-bold">Form Karyawan</h1>
            <div className="ml-auto"></div>
            <a
              href={`http://localhost:5000/employees/print/${employee._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
              Cetak
            </a>
          </div>
          <table className="w-full text-sm mb-4">
            <tbody>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Jabatan / Posisi
                </th>
                <td className="border px-4 py-2 text-left">
                  [{employee.position.code}] {employee.position.name}
                </td>
              </tr>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Department
                </th>
                <td className="border px-4 py-2 text-left">
                  [{employee.department.code}] {employee.department.name}
                </td>
              </tr>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Tanggal Direkrut
                </th>
                <td className="border px-4 py-2 text-left">
                  {time.getDateString(employee.joinDate)}
                </td>
              </tr>
              <tr className="grid mb-4 md:table-row">
                <th className="border px-4 py-2 text-left whitespace-no-wrap md:w-64">
                  Gaji Pokok
                </th>
                <td className="border px-4 py-2 text-left">
                  {IDR(employee.position.salary)}
                </td>
              </tr>
            </tbody>
          </table>
        </CardLarge>
      )}
      <CardLarge>
        <div className="flex flex-wrap mb-4">
          <h1 className="text-xl font-bold text-yellow-600">
            {user.privilege === "admin" && "Profile Karyawan (Admin)"}
            {user.privilege === "employee" && "Profile Karyawan"}
            {user.privilege === "candidate" && "Profile Calon Karyawan"}
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/user/profile/edit"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Edit Profile Pengguna
          </Link>
        </div>
        <div className="flex items-center md:items-end flex-col md:flex-row-reverse">
          <div className="border mb-4 md:ml-4 md:mb-0 w-64 px-4 py-2">
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
      <CardLarge>
        <div className="flex items-center flex-wrap mb-4">
          <h1 className="text-lg text-yellow-600 font-semibold">
            Riwayat Pendidikan
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/user/educations"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Edit / Tambah Pendidikan
          </Link>
        </div>
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
      </CardLarge>
      <CardLarge>
        <div className="flex items-center flex-wrap mb-4">
          <h1 className="text-lg text-yellow-600 font-semibold">
            Riwayat Pengalaman
          </h1>
          <div className="ml-auto"></div>
          <Link
            to="/user/experiences"
            className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm">
            Edit / Tambah Pengalaman
          </Link>
        </div>
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
      </CardLarge>
    </>
  );
}
