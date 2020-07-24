import React from "react";

// Import custom modules

// Import components
import Container from "../layout/Container";
import RecruitmentCard from "../components/RecruitmentCard";
import { useAxiosGet } from "../hooks/request";
import Loader from "../components/Loader";

export default function RecruitmentList({ location }) {
  const [recruitments, isLoading, error] = useAxiosGet("/recruitments");

  if (error) return <h1>Error fetching data...</h1>;

  if (isLoading) return <Loader />;

  return (
    <Container className="grid row-gap-4">
      {recruitments &&
        recruitments.map((recruitment) => (
          <RecruitmentCard key={recruitment._id} recruitment={recruitment} />
        ))}
    </Container>
  );
}
