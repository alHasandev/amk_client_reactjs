import React, { useState, useEffect } from "react";

// Import components
import Container from "../layout/Container";
import CandidateCard from "../components/CandidateCard";
import { CardLarge } from "../components/Card";
import { useAxiosGet } from "../hooks/request";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

export default function CandidateList() {
  const params = useParams();
  // Handle data
  const [recruitment, isRLoading, rError] = useAxiosGet(
    `/recruitments/${params.id}`
  );

  const [candidates, isCLoading, cError] = useAxiosGet(
    `/recruitments/${params.id}/candidates`
  );

  // Scroll change
  const [pageYOffset, setPageYOffset] = useState(0);
  const handleScrollChange = (ev) => setPageYOffset(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollChange);
    return () => {
      setPageYOffset(0);
      return window.removeEventListener("scroll", handleScrollChange);
    };
  }, []);

  if (rError || cError) return <h1>Error...</h1>;
  if (isRLoading || isCLoading) return <Loader />;

  if (!recruitment || !candidates) return <h1>Data not Found!</h1>;

  return (
    <Container className="md:ml-10 md:flex md:items-start">
      <div className="mb-4 md:w-1/2 md:mr-4 md:mb-0">
        <div
          className={
            pageYOffset > 70
              ? "lg:fixed lg:w-1/2 lg:top-0 lg:mt-2 lg:pr-10"
              : ""
          }>
          <CardLarge>
            <h1 className="font-bold text-xl mb-2">{recruitment.title}</h1>
            <h3 className="mb-1 font-semibold">
              Posisi: {recruitment.positionName}
            </h3>
            <h3 className="mb-2 font-semibold">
              Department: {recruitment.departmentName}
            </h3>

            <h3 className="font-semibold">Keterangan: </h3>
            <p className="mb-4">{recruitment.description}</p>
          </CardLarge>
        </div>
      </div>
      <div className="md:w-1/2 grid row-gap-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} />
        ))}
      </div>
    </Container>
  );
}
