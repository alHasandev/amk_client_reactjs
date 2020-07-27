import React from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";

// Import components
import Container from "../layout/Container";
import { CardMedium } from "../components/Card";
import { useAxiosGet, useAxios } from "../hooks/request";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function RecruitmentDetail() {
  const params = useParams();
  const history = useHistory();
  console.log(params);
  const [recruitment, isLoading, error] = useAxiosGet(
    `/recruitments/${params.id}`
  );

  const [res, status, api] = useAxios("/recruitments/");

  const applyToRecruitment = async (recruitment) => {
    console.log(res, status, api);
    if (
      !window.confirm(
        `Apakah anda yakin akan melamar untuk posisi: ${recruitment.positionName} ?`
      )
    )
      return;

    api.save({}, `/${params.id}/candidate`);
  };

  if (error) return <Error error={error} />;
  if (status === "error" && !!res) {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
    return <Error error={res} timeout="3000" />;
  }
  if (isLoading || status === "requesting") return <Loader />;
  if (status === "success" && !!res) return <Redirect to="/profile" />;

  if (!recruitment) return <h1>Not Data 404</h1>;
  console.log(recruitment);
  return (
    <Container className="">
      <CardMedium>
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
            onClick={() => applyToRecruitment(recruitment)}>
            Lamar
          </button>
        </div>
      </CardMedium>
    </Container>
  );
}
