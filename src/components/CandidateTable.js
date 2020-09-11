import React from "react";
import { Link } from "react-router-dom";

// Import static assets
import { profile as profileImage } from "../assets";

// Import components
import { CardLarge } from "./Card";
import Loader from "./Loader";
import { useQuery } from "react-query";
import { getUsers, deleteUser } from "../apis/users";
import {
  getCandidates,
  deleteCandidate,
  patchCandidate,
} from "../apis/candidates";

export default function CandidateTable() {
  const candidates = useQuery("candidates", getCandidates);

  if (candidates.isLoading) return <Loader />;

  return (
    <CardLarge className="overflow-x-auto">
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
          className="px-4 py-1 text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
          Report
        </a>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border">NO.</th>
            <th className="py-2 px-4 border">IMAGE</th>
            <th className="py-2 px-4 border">NAME</th>
            <th className="py-2 px-4 border">POSISI DILAMAR</th>
            <th className="py-2 px-4 border">PENDIDIKAN TERAKHIR</th>
            <th className="py-2 px-4 border">STATUS</th>
            <th className="py-2 px-4 border">Tanggal</th>
            <th className="py-2 px-4 border">ACTION</th>
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
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="p-1 border text-center w-16">
                    <div className="border-2 border-yellow-600 rounded bg-gray-200">
                      <img src={profileImage} alt="profile" />
                    </div>
                  </td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">
                    {recruitment.positionName}
                  </td>
                  <td className="py-2 px-4 border text-center uppercase">
                    {education.school}
                  </td>
                  <td className="py-2 px-4 border text-center uppercase">
                    {candidate.status}
                  </td>
                  <td className="py-2 px-4 border text-center uppercase">
                    {new Date(candidate.appliedAt).toLocaleDateString("id-ID")}
                  </td>

                  <td className="py-1 px-4 border text-center">
                    <button
                      onClick={async (ev) => {
                        if (
                          window.confirm(
                            "Apakah anda yakin akan menerima kandidat ini ?"
                          )
                        ) {
                          if (
                            await patchCandidate(
                              { status: "accepted" },
                              candidate._id
                            )
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
                          window.confirm(
                            "Apakah anda yakin akan menolak kandidat ini ?"
                          )
                        ) {
                          if (
                            await patchCandidate(
                              { status: "rejected" },
                              candidate._id
                            )
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
                    <button
                      onClick={async (ev) => {
                        if (
                          window.confirm(
                            "Apakah anda yakin akan merekrut kandidat ini ?"
                          )
                        ) {
                          if (
                            await patchCandidate(
                              { status: "hired" },
                              candidate._id
                            )
                          ) {
                            alert("Operasi berhasi!");
                          } else {
                            alert("Operasi gagal!");
                          }
                        }
                      }}
                      className="rounded font-bold my-1 mx-1 text-white bg-blue-500 hover:bg-blue-600 py-1 px-2">
                      Rekrut
                    </button>
                    <button
                      onClick={async (ev) => {
                        if (
                          window.confirm(
                            "Apakah anda yakin akan menghapus kandidat ini ?"
                          )
                        ) {
                          if (await deleteCandidate(candidate._id)) {
                            await candidates.refetch();
                            alert("Operasi berhasi!");
                          } else {
                            alert("Operasi gagal!");
                          }
                        }
                      }}
                      className="rounded font-bold my-1 mx-1 text-white bg-red-500 hover:bg-red-600 py-1 px-2">
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </CardLarge>
  );
}
