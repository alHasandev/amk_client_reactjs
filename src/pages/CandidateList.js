import React, { useState, useEffect } from "react";

// Import components
import Container from "../layout/Container";
import Background from "../layout/Background";
import CandidateCard from "../components/CandidateCard";
import { CardLarge } from "../components/Card";

export default function CandidateList() {
  const [pageYOffset, setPageYOffset] = useState(0);

  const handleScrollChange = (ev) => setPageYOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange);
    return () => {
      setPageYOffset(0);
      return window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  return (
    <Background className="px-4">
      <Container className="md:ml-10 md:flex md:items-start">
        <div className="mb-4 md:w-1/2 md:mr-4 md:mb-0">
          <div
            className={
              pageYOffset > 70
                ? "lg:fixed lg:w-1/2 lg:top-0 lg:mt-2 lg:pr-10"
                : ""
            }>
            <CardLarge>
              <h1 className="font-bold text-xl">
                Dibutuhkan Chef Berpengalaman
              </h1>
              <h3 className="mb-4 font-semibold">Posisi: Chef</h3>

              <h3 className="font-semibold">Keterangan: </h3>
              <p className="mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, doloremque iusto! Consectetur dolorum amet, officiis
                ducimus magnam odit nam repellendus sequi repudiandae beatae
                voluptas! Natus quos perferendis molestiae eaque eveniet? Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Iure
                excepturi quae illum quia delectus animi aliquam ad, provident
                voluptatum, omnis in magni non odit veritatis hic atque impedit
                consequuntur et.
              </p>

              <h3 className="font-semibold">Persyaratan: </h3>
              <ol className="list-decimal pl-4 mb-4">
                <li className="pl-2">
                  Pendidikan min. S1 Tataboga atau serupa
                </li>
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
                  Gaji pokok 3 bulan pertama (masa penyesuaian) Rp.
                  38.000.000,00, dan akan dinaikan sesuai evaluasi
                </li>
                <li className="pl-2">Rumah karyawan</li>
                <li className="pl-2">Makan 3x sehari</li>
                <li className="pl-2">Bonus bulanan dan tunjangan hari raya</li>
              </ol>
            </CardLarge>
          </div>
        </div>
        <div className="md:w-1/2 grid row-gap-4">
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
        </div>
      </Container>
    </Background>
  );
}
