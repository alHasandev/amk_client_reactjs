import React from "react";

// Import custom modules

// Import components
import Container from "../layout/Container";
import RecruitmentCard from "../components/RecruitmentCard";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import { getRecruitments } from "../apis/recruitments";

export default function RecruitmentList() {
  const recruitments = useQuery(
    ["recruitments", { status: "open" }],
    getRecruitments
  );

  if (recruitments.isLoading) return <Loader />;

  return (
    <Container className="grid row-gap-4">
      {recruitments.data &&
        recruitments.data.map((recruitment) => (
          <RecruitmentCard key={recruitment._id} recruitment={recruitment} />
        ))}
    </Container>
  );
}
