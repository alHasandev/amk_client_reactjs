import React from "react";
import Container from "../../layout/Container";
import Topbar from "../../components/Topbar";

const topbarLinks = [];

export default function Request({ children }) {
  return <Container className="grid gap-4">{children}</Container>;
}
