import React from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";

// Import components
import Container from "../layout/Container";
import { CardMedium } from "../components/Card";
import { useAxiosGet, useAxios } from "../hooks/request";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useQuery } from "react-query";
import { getRecruitment, getRecruitments } from "../apis/recruitments";
import { getCandidates, postCandidate } from "../apis/candidates";

export default function RecruitmentDetail() {
  const params = useParams();
  const history = useHistory();
  console.log(params);
  // const [recruitment, isLoading, error] = useAxiosGet(
  //   `/recruitments/${params.id}`
  // );

  const recruitment = useQuery(["recruitment", params.id], getRecruitments);
  const candidates = useQuery("candidates", getCandidates);
  // const [res, status, api] = useAxios("/recruitments/");

  const applyToRecruitment = async (recruitment) => {
    // console.log(res, status, api);
    if (
      !window.confirm(
        `Apakah anda yakin akan melamar untuk posisi: ${recruitment.data.positionName} ?`
      )
    )
      return;

    // api.save({}, `/${params.id}/candidates`);
    if (
      postCandidate({
        recruitment: params.id,
      })
    ) {
      history.push("/user/profile");
    }
  };

  if (recruitment.isLoading || candidates.isLoading) return <Loader />;

  console.log(recruitment);
  return (
    <Container className="">
      <CardMedium>
        <h1 className="font-bold text-xl mb-2">{recruitment.title}</h1>
        <h3 className="font-semibold mb-2">
          Posisi: {recruitment.data.positionName}
        </h3>
        <h3 className="font-semibold mb-4">
          Department: {recruitment.data.departmentName}
        </h3>

        <h3 className="font-semibold">Keterangan: </h3>
        <p className="mb-4">{recruitment.data.description}</p>

        <hr />
        <div className="flex">
          <Link
            to="/recruitments"
            className="inline-block bg-yellow-800 text-white hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-sm font-bold mt-4">
            Kembali
          </Link>
          <button
            className="inline-block bg-yellow-500 text-back hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-sm font-bold mt-4 ml-auto"
            onClick={() => applyToRecruitment(recruitment)}>
            Lamar
          </button>
        </div>
      </CardMedium>
    </Container>
  );
}
