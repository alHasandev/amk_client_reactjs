import React from "react";

// Import custom modules

// Import components
import Container from "../layout/Container";
import RecruitmentCard from "../components/RecruitmentCard";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import { getRecruitments } from "../apis/recruitments";
import { CardExtraLarge, CardMini } from "../components/Card";
import { Link } from "react-router-dom";

export default function RecruitmentList() {
  const recruitments = useQuery(
    ["recruitments", { params: { status: "open", isActive: true } }],
    getRecruitments
  );

  if (recruitments.isLoading) return <Loader />;

  return (
    <Container className="grid row-gap-4">
      {recruitments.data &&
        recruitments.data.map((recruitment) => (
          <RecruitmentCard key={recruitment._id} recruitment={recruitment} />
        ))}
      {!recruitments.data ||
        (recruitments.data.length === 0 && (
          <CardExtraLarge className="w-full text-center flex justify-center items-center flex-col">
            <p className="text-lg text-yellow-600 mb-4">
              Maaf untuk saat ini penerimaan karyawan baru belum tersedia
            </p>
            <Link
              to="/"
              className="px-4 py-1 text-sm bg-yellow-600 text-white font-semibold hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
              Kembali ke halaman utama
            </Link>
          </CardExtraLarge>
        ))}
    </Container>
  );
}
