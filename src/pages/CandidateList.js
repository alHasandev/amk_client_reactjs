import React, { useState, useEffect } from "react";
import queryString from "query-string";

// Import components
import Container from "../layout/Container";
import CandidateCard from "../components/CandidateCard";
import { CardLarge } from "../components/Card";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import CandidateProfile from "./admin/CandidateProfile";
import { getRecruitments } from "../apis/recruitments";
import { useQuery } from "react-query";
import { getCandidates } from "../apis/candidates";

export default function CandidateList() {
  const [status, setStatus] = useState("");
  const params = useParams();
  const query = queryString.parse(window.location.search);
  // Handle data
  // const [recruitment, isRLoading, rError] = useAxiosGet(
  //   `/recruitments/${params.id}`
  // );

  // const [candidates, isCLoading, cError] = useAxiosGet(
  //   `/recruitments/${params.id}/candidates?status=${query.status}`
  // );

  const recruitment = useQuery(["recruitment", params.id], getRecruitments);
  const candidates = useQuery(
    ["candidates", { status: query.status }],
    getCandidates
  );

  // Scroll change
  const [pageYOffset, setPageYOffset] = useState(0);
  const handleScrollChange = (ev) => setPageYOffset(window.pageYOffset);

  useEffect(() => {
    setStatus(queryString.parse(window.location.search).status);
    window.addEventListener("scroll", handleScrollChange);
    return () => {
      setPageYOffset(0);
      return window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  if (recruitment.isLoading || candidates.isLoading) return <Loader />;

  return (
    <Container className="flex xl:items-start flex-col xl:flex-row">
      <div className="mb-4 xl:w-1/2 xl:mr-4 xl:mb-0">
        <div
          className={
            pageYOffset > 70
              ? "xl:fixed xl:w-1/2 xl:top-0 xl:mt-2 xl:pr-10"
              : ""
          }>
          <CardLarge>
            <h1 className="font-bold text-xl mb-2">{recruitment.data.title}</h1>
            <h3 className="mb-1 font-semibold">
              Posisi: {recruitment.data.positionName}
            </h3>
            <h3 className="mb-2 font-semibold">
              Department: {recruitment.data.departmentName}
            </h3>

            <h3 className="font-semibold">Keterangan: </h3>
            <p className="mb-4">{recruitment.data.description}</p>
          </CardLarge>
        </div>
      </div>
      <div className="xl:w-1/2 grid row-gap-4">
        {params.candidateId ? (
          <CandidateProfile recruitment={recruitment.data} status={status} />
        ) : (
          candidates.data.map((candidate) => (
            <Link
              key={candidate._id}
              to={`/admin/recruitments/${params.id}/candidates/${candidate._id}`}>
              <CandidateCard candidate={candidate} />
            </Link>
          ))
        )}
      </div>
    </Container>
  );
}
