import React from "react";
import { Link, useParams } from "react-router-dom";

// Import components
import Container from "../layout/Container";
import { CardLarge } from "../components/Card";
import { useAxiosGet } from "../hooks/request";
import Loader from "../components/Loader";

export default function RecruitmentDetail() {
  const params = useParams();
  console.log(params);
  const [recruitment, isLoading, error] = useAxiosGet(
    `/recruitments/${params.id}`
  );
  const applyToRecruitment = async () => {};

  if (error) return <h1>Error fetching data please refresh!...</h1>;
  if (isLoading) return <Loader />;

  if (!recruitment) return <h1>Not Data 404</h1>;
  console.log(recruitment);
  return (
    <Container className="md:ml-10">
      <CardLarge>
        <h1 className="font-bold text-xl mb-2">{recruitment.title}</h1>
        <h3 className="font-semibold mb-2">
          Posisi: {recruitment.positionName}
        </h3>
        <h3 className="font-semibold mb-4">
          Department: {recruitment.departmentName}
        </h3>

        <h3 className="font-semibold">Keterangan: </h3>
        <p className="mb-4">{recruitment.description}</p>

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
  );
}
