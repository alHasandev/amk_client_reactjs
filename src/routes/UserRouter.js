import React from "react";
import { Route, Switch } from "react-router-dom";
import ProfilePage from "../pages/user/Profile";
import { BTN_COLOR } from "../assets";
import Container from "../layout/Container";
import Topbar from "../components/Topbar";
import UserUpdate from "../pages/user/UserUpdate";
import ProfileUpdate from "../pages/user/ProfileUpdate";
import EducationPage from "../pages/user/Education";
import ExperiencePage from "../pages/user/Experience";

const topbarLinks = [
  {
    to: "/user/salaries",
    label: "Slip Gaji",
    className: BTN_COLOR.YELLOW_MEDIUM,
  },
  {
    to: "/user/attendances",
    label: "Kehadiran",
    className: BTN_COLOR.YELLOW_LIGHT,
  },
  {
    to: "/user/recruitment",
    label: "Progress Lamaran",
    className: BTN_COLOR.YELLOW_MEDIUM,
  },
  {
    to: "/user/profile/update",
    label: "Update Profile",
    className: BTN_COLOR.YELLOW_LIGHT,
  },
  {
    to: "/user/update",
    label: "Update User",
    className: BTN_COLOR.YELLOW_MEDIUM,
  },
];

export default function UserRouter() {
  return (
    <Container>
      <Topbar homeLink="/user/profile" links={topbarLinks} />
      <Switch>
        <Route exact path="/user/update" component={UserUpdate} />
        <Route exact path="/user/profile" component={ProfilePage} />
        <Route exact path="/user/profile/update" component={ProfileUpdate} />
        <Route exact path="/user/educations" component={EducationPage} />
        <Route exact path="/user/experiences" component={ExperiencePage} />
      </Switch>
    </Container>
  );
}
