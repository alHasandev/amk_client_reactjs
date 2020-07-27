import React from "react";
import { CardSmall, CardMedium } from "../../components/Card";

// Import static assets
import { profile as profileImage } from "../../assets";
import { useAxiosGet } from "../../hooks/request";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import time, { calculateAge, reverseNormalDate } from "../../utils/time";

export default function Profile() {
  const [user, isUserLoading, userError] = useAxiosGet("/users/me");

  if (userError) return <Error error={userError} />;
  if (isUserLoading) return <Loader />;
  if (!user) return <Error error={{ message: "404 User Not Found!" }} />;

  console.log(user);

  return (
    <>
      <div className="flex items-start flex-col lg:flex-row mb-4">
        <CardSmall className="lg:mr-4 mb-4 flex items-center flex-col md:flex-row lg:mb-0">
          <div className="border md:p-2 overflow-auto rounded-full md:rounded bg-gray-100 shadow-inner w-40 mb-4 md:mr-4 md:mb-0">
            <img src={profileImage} alt="profile" />
          </div>
          <div className="border rounded px-4 py-2 w-full text-center md:text-left">
            <h1 className="font-semibold text-xl text-gray-900 uppercase">
              [{user.privilege}]
            </h1>
            <h3 className="font-semibold text-md text-gray-900">{user.name}</h3>
            <small className="text-gray-500 mb-4">{user.email}</small>
            <h2>NIK: {user.nik}</h2>
          </div>
        </CardSmall>
        <CardMedium>
          {user.profile ? (
            <table className="w-full text-gray-800">
              <tbody>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left">Jenis Kelamin:</th>
                  <td className="border px-4 py-2">{user.profile.gender}</td>
                </tr>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left">Umur:</th>
                  <td className="border px-4 py-2">
                    {calculateAge(user.profile.birthDate)} Tahun
                  </td>
                </tr>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left">
                    Tempat, Tanggal Lahir:
                  </th>
                  <td className="border px-4 py-2">
                    {user.profile.birthPlace},{" "}
                    {reverseNormalDate(user.profile.birthDate)}
                  </td>
                </tr>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left">Skills:</th>
                  <td className="border px-4 py-2">
                    {user.profile.skills.join(", ")}
                  </td>
                </tr>
                <tr className="grid md:table-row">
                  <th className="border px-4 py-2 text-left">Bio:</th>
                  <td className="border px-4 py-2">{user.profile.bio}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <Link
              to="/user/profile/update"
              className="inline-block px-4 py-1 text-sm rounded-sm shadow-sm font-semibold bg-yellow-600 text-white hover:bg-yellow-700">
              Tolong Lengkapi Profile Anda !
            </Link>
          )}
        </CardMedium>
      </div>
      <div className="flex items-start flex-col xl:flex-row">
        <CardMedium className="mb-4 xl:mr-4 xl:mb-0">
          <div className="mb-4">
            <Link
              to="/user/educations"
              className="inline-block px-4 py-1 text-sm bg-yellow-400 text-black hover:bg-yellow-500 rounded-sm shadow-sm font-semibold">
              Update Pendidikan
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="hidden md:table-header-group text-gray-800">
              <tr>
                <th className="border px-4 py-2">NO.</th>
                <th className="border px-4 py-2">Nama Sekolah</th>
                <th className="border px-4 py-2">Tingkat</th>
                <th className="border px-4 py-2">Jurusan</th>
                <th className="border px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {user.profile &&
                user.profile.educations.map((education, index) => (
                  <tr
                    key={education._id}
                    className="grid mb-4 md:table-row md:mb-0">
                    <td className="hidden md:table-cell border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 font-bold md:font-normal">
                      {education.school}
                    </td>
                    <td className="border px-4 py-2">{education.degree}</td>
                    <td className="border px-4 py-2">{education.major}</td>
                    <td className="border px-4 py-2 text-center whitespace-no-wrap">
                      {time.year(education.from)} ~{" "}
                      {!education.isCurrently
                        ? time.year(education.to)
                        : "Sekarang"}
                    </td>
                  </tr>
                ))}
              {(!user.profile || user.profile.educations.length === 0) && (
                <tr className="text-center">
                  <td className="py-2 px-4 border hidden md:table-cell">0</td>
                  <td className="py-2 px-4 border" colSpan="3">
                    Tolong tambahkan pendidikan anda
                  </td>
                  <td className="py-2 px-4 border hidden md:table-cell"></td>
                </tr>
              )}
            </tbody>
          </table>
        </CardMedium>
        <CardMedium>
          <div className="mb-4">
            <Link
              to="/user/experiences"
              className="inline-block px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm font-semibold">
              Update Pengalaman
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="hidden md:table-header-group text-gray-800">
              <tr>
                <th className="border px-4 py-2">NO.</th>
                <th className="border px-4 py-2">Nama Perusahaan</th>
                <th className="border px-4 py-2">Bidang</th>
                <th className="border px-4 py-2">Pekerjaan</th>
                <th className="border px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {user.profile &&
                user.profile.experiences.map((experience, index) => (
                  <tr
                    key={experience._id}
                    className="grid mb-4 md:table-row md:mb-0">
                    <td className="hidden md:table-cell border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 font-bold md:font-normal">
                      {experience.company}
                    </td>
                    <td className="border px-4 py-2">{experience.field}</td>
                    <td className="border px-4 py-2">{experience.job}</td>
                    <td className="border px-4 py-2 text-center whitespace-no-wrap">
                      {time.year(experience.from)} ~{" "}
                      {!experience.isCurrent
                        ? time.year(experience.to )
                        : "Sekarang"}
                    </td>
                  </tr>
                ))}
              {(!user.profile || user.profile.experiences.length === 0) && (
                <tr className="text-center">
                  <td className="py-2 px-4 border hidden md:table-cell">0</td>
                  <td className="py-2 px-4 border" colSpan="3">
                    Tolong tambahkan pengalaman anda
                  </td>
                  <td className="py-2 px-4 border hidden md:table-cell"></td>
                </tr>
              )}
            </tbody>
          </table>
        </CardMedium>
      </div>
    </>
  );
}
