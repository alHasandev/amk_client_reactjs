import React from "react";

// Import custom modules

// Import components
import Container from "../layout/Container";
import Background from "../layout/Background";
import RecruitmentCard from "../components/RecruitmentCard";

export default function RecruitmentList({ location }) {
  return (
    <Background className="px-4">
      <Container className="grid row-gap-4">
        <RecruitmentCard link={`${location.pathname}/1234`} />
      </Container>
    </Background>
  );
}
