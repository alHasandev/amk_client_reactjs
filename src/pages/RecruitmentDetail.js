import React from "react";
import { Link, useHistory } from "react-router-dom";

// Import components
import Background from "../layout/Background";
import Container from "../layout/Container";
import { CardLarge } from "../components/Card";

const restDummy = async () => {
  return Promise.resolve(true);
};

export default function RecruitmentDetail() {
  const history = useHistory();
  const applyToRecruitment = async () => {
    if (window.confirm("Apakah anda yakin ingin melamar pekerjaan ini ?")) {
      console.log(await restDummy());
      if (await restDummy()) {
        alert("Pekerjaan berhasil anda lamar, silahkan lengkapi profil anda!!");
        history.push("/");
      } else {
        alert("Operation Failed!!");
      }
    }
  };

  return (
    <Background className="px-4">
      <Container className="md:ml-10">
        <CardLarge>
          <h1 className="font-bold text-xl">Dibutuhkan Chef Berpengalaman</h1>
          <h3 className="mb-4 font-semibold">Posisi: Chef</h3>

          <h3 className="font-semibold">Keterangan: </h3>
          <p className="mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate, doloremque iusto! Consectetur dolorum amet, officiis
            ducimus magnam odit nam repellendus sequi repudiandae beatae
            voluptas! Natus quos perferendis molestiae eaque eveniet? Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Iure excepturi
            quae illum quia delectus animi aliquam ad, provident voluptatum,
            omnis in magni non odit veritatis hic atque impedit consequuntur et.
          </p>

          <h3 className="font-semibold">Persyaratan: </h3>
          <ol className="list-decimal pl-4 mb-4">
            <li className="pl-2">Pendidikan min. S1 Tataboga atau serupa</li>
            <li className="pl-2">
              Pengalaman dalam bidang ini min. selama 2 tahun
            </li>
            <li className="pl-2">
              Bersedia untuk tidak memutus kontrak selama 5 tahun.
            </li>
            <li className="pl-2">Bersedia ditempatkan dimana saja.</li>
          </ol>

          <h3 className="font-semibold">Yang Akan Anda Dapatkan: </h3>
          <ol className="list-decimal pl-4 mb-4">
            <li className="pl-2">
              Gaji pokok 3 bulan pertama (masa penyesuaian) Rp. 38.000.000,00,
              dan akan dinaikan sesuai evaluasi
            </li>
            <li className="pl-2">Rumah karyawan</li>
            <li className="pl-2">Makan 3x sehari</li>
            <li className="pl-2">Bonus bulanan dan tunjangan hari raya</li>
          </ol>
          <hr />
          <div className="flex">
            <Link
              to="/recruitments"
              className="inline-block bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-sm font-bold mt-4">
              Kembali
            </Link>
            <button
              className="inline-block bg-yellow-500 text-back hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-sm font-bold mt-4 ml-auto"
              onClick={applyToRecruitment}>
              Lamar
            </button>
          </div>
        </CardLarge>
      </Container>
    </Background>
  );
}
