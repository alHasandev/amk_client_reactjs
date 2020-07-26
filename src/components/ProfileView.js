import React from "react";
import { CardSmall, CardMedium } from "./Card";

// Import static assets
import { profile as profileImage } from "../assets";
import { useAxiosGet } from "../hooks/request";
import Error from "./Error";
import Loader from "./Loader";

export default function ProfileView() {
  const [user, isUserLoading, userError] = useAxiosGet("/users/me");

  if (userError) return <Error error={userError} />;
  if (isUserLoading) return <Loader />;
  if (!user) return <Error error={{ message: "404 User Not Found!" }} />;

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
          <table className="w-full text-gray-800">
            <tbody>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left">Jenis Kelamin:</th>
                <td className="border px-4 py-2">Laki-Laki</td>
              </tr>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left">Umur:</th>
                <td className="border px-4 py-2">21 Tahun</td>
              </tr>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left">
                  Tempat/Tanggal Lahir:
                </th>
                <td className="border px-4 py-2">Teluk Tamba, 26-04-1999</td>
              </tr>
              <tr className="grid md:table-row">
                <th className="border px-4 py-2 text-left">Bio:</th>
                <td className="border px-4 py-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laudantium laborum magni voluptatibus explicabo qui sapiente
                  libero ut, dolores corporis quidem saepe consequuntur odit
                  cupiditate accusamus nam harum nemo dicta rem?
                </td>
              </tr>
            </tbody>
          </table>
        </CardMedium>
      </div>
      <div className="flex items-start flex-col xl:flex-row">
        <CardMedium className="mb-4 xl:mr-4 xl:mb-0">
          <table className="w-full">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="border px-4 py-2">NO.</th>
                <th className="border px-4 py-2">Nama Sekolah</th>
                <th className="border px-4 py-2">Tingkat</th>
                <th className="border px-4 py-2">Jurusan</th>
                <th className="border px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  1
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  SDN 1 Tabukan
                </td>
                <td className="border px-4 py-2">Sekolah Dasar</td>
                <td className="border px-4 py-2">Umum</td>
                <td className="border px-4 py-2 tex">2004-2010</td>
              </tr>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  2
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  SPMN 1 Tabukan
                </td>
                <td className="border px-4 py-2">Sekolah Menengah</td>
                <td className="border px-4 py-2">Umum</td>
                <td className="border px-4 py-2">2010-2013</td>
              </tr>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  3
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  SMKN 5 Banjarmasin
                </td>
                <td className="border px-4 py-2">Sekolah Tinggi</td>
                <td className="border px-4 py-2">Teknik Komputer Jaringan</td>
                <td className="border px-4 py-2">2013-2016</td>
              </tr>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  4
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  Uniska Banjarmasin
                </td>
                <td className="border px-4 py-2">Sarjana 1</td>
                <td className="border px-4 py-2">Teknik Informatika</td>
                <td className="border px-4 py-2">2016-Sekarang</td>
              </tr>
            </tbody>
          </table>
        </CardMedium>
        <CardMedium>
          <table className="w-full">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="border px-4 py-2">NO.</th>
                <th className="border px-4 py-2">Nama Perusahaan</th>
                <th className="border px-4 py-2">Bidang</th>
                <th className="border px-4 py-2">Pekerjaan</th>
                <th className="border px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  1
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  Adil Komputer
                </td>
                <td className="border px-4 py-2">Toko Komputer</td>
                <td className="border px-4 py-2">Teknisi Magang</td>
                <td className="border px-4 py-2 tex">2014-2014</td>
              </tr>
              <tr className="grid mb-4 md:table-row md:mb-0">
                <td className="hidden md:table-cell border px-4 py-2 text-center">
                  2
                </td>
                <td className="border px-4 py-2 font-bold md:font-normal">
                  KSOP Banjarmasin
                </td>
                <td className="border px-4 py-2">Dinas Pelabuhan</td>
                <td className="border px-4 py-2">Administrasi Magang</td>
                <td className="border px-4 py-2 tex">2015-2016</td>
              </tr>
            </tbody>
          </table>
        </CardMedium>
      </div>
    </>
  );
}
