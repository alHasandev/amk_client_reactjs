import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

// Import components
import Container from "../layout/Container";
import { CardLarge } from "../components/Card";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import { getRecruitments } from "../apis/recruitments";
import { postCandidate } from "../apis/candidates";
import time from "../utils/time";
import { getUsers } from "../apis/users";
import { IDR } from "../utils/currency";

export default function RecruitmentDetail() {
  const params = useParams();
  const history = useHistory();
  const userQuery = useQuery(
    [
      "user",
      {
        endpoint: "me",
      },
    ],
    getUsers
  );
  const recruitmentQuery = useQuery(
    [
      "recruitment",
      {
        endpoint: params.id,
      },
    ],
    getRecruitments
  );

  const applyToRecruitment = async (recruitment) => {
    console.log(recruitment);
    if (
      window.confirm(
        `Apakah anda yakin akan melamar jabatan / posisi: [${recruitment.position.code}] ${recruitment.position.name} ?`
      )
    ) {
      try {
        const res = await postCandidate({ recruitment: recruitment._id });
        if (res)
          alert(
            `Berhasil melamar [${recruitment.position.code}] ${recruitment.position.name} !!`
          );
        history.push("/user/profile");
        // console.log("response", res);
      } catch (err) {
        // console.log("lamaran error", err.response);
        alert(err.response.data.message);
      }
    }
  };

  if (recruitmentQuery.isLoading || userQuery.isLoading) return <Loader />;
  const user = userQuery.data;
  const profile = user.profile;
  console.log("user", user);
  const recruitment = recruitmentQuery.data ? recruitmentQuery.data : {};
  const position = recruitment.position ? recruitment.position : {};
  const department = recruitment.department ? recruitment.department : {};
  const requirements = recruitment.requirements ? recruitment.requirements : [];

  console.log(recruitment);
  return (
    <Container className="">
      <CardLarge>
        <h1 className="font-bold text-2xl text-yellow-600 mb-4">
          {recruitment.title}
        </h1>
        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left md:w-64">
                Jabatan / Posisi
              </th>
              <td className="border px-4 py-2 text-left">
                [{position.code}] {position.name}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">Department</th>
              <td className="border px-4 py-2 text-left">
                [{department.code}] {department.name}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">Gaji Pokok</th>
              <td className="border px-4 py-2 text-left">
                {user ? IDR(position.salary) : "Login untuk melihat gaji"}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">Jumlah Diperlukan</th>
              <td className="border px-4 py-2 text-left">
                {recruitment.numberRequired} orang
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2 text-left">Batas Waktu</th>
              <td className="border px-4 py-2 text-left">
                {time.getDateString(recruitment.expiredAt)}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left">Keterangan</th>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-left">
                {recruitment.description}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <th className="border px-4 py-2 text-left" colSpan="2">
                Persyaratan
              </th>
            </tr>
            {requirements.map((requirement, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center md:w-4">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2 text-left">{requirement}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <hr className="mb-4" />
        <div className="flex items-center">
          <div className="ml-auto"></div>
          <Link
            to="/recruitments"
            className="inline-block bg-yellow-700 text-white hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-sm font-bold">
            Kembali
          </Link>
          {user && profile && (
            <button
              className="inline-block bg-yellow-600 text-white hover:bg-yellow-800 hover:text-white px-4 py-2 rounded-sm font-semibold ml-4"
              onClick={(ev) => applyToRecruitment(recruitment)}>
              Lamar
            </button>
          )}
          {!user && (
            <Link
              to="/login"
              className="inline-block bg-yellow-600 text-white hover:bg-yellow-800 hover:text-white px-4 py-2 rounded-sm font-semibold ml-4">
              Login untuk melamar!
            </Link>
          )}
          {user && !profile && (
            <Link
              to="/user/profile/edit"
              className="inline-block bg-yellow-600 text-white hover:bg-yellow-800 hover:text-white px-4 py-2 rounded-sm font-semibold ml-4">
              Lengkapi Profile Anda Untuk Melamar!
            </Link>
          )}
        </div>
      </CardLarge>
    </Container>
  );
}
