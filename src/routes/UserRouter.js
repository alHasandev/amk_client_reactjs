import React, { useEffect, useState } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import ProfilePage from "../pages/user/Profile";
import { BTN_COLOR } from "../assets";
import Container from "../layout/Container";
import Topbar from "../components/Topbar";
import UserUpdate from "../pages/user/UserUpdate";
import ProfileUpdate from "../components/UserProfileForm";
import EducationPage from "../pages/user/Education";
import ExperiencePage from "../pages/user/Experience";
import { useQuery } from "react-query";
import { getMyProfile, getUsers } from "../apis/users";
import Loader from "../components/Loader";
import UserRequest from "../pages/user/Request";
import UserRequestTable from "../components/UserRequestTable";
import UserRequestForm from "../components/UserRequestForm";
import UserAttendance from "../pages/user/Attendance";
import UserSalaryTable from "../components/UserSalaryTable";
import UserSalaryDetail from "../components/UserSalaryDetail";
import UserDetail from "../components/UserProfile";
import ScanQR from "../components/ScanQR";
import UserProfileForm from "../components/UserProfileForm";
import UserAssessmentTable from "../components/UserAssessmentTable";
import { CardMini } from "../components/Card";
import RequestDetail from "../components/RequestDetail";
import { backLink } from "../utils/url";
import AssessmentDetail from "../components/AssessmentDetail";

export default function UserRouter() {
  const userQuery = useQuery(
    [
      "user",
      {
        endpoint: "me",
      },
    ],
    getUsers
  );

  if (userQuery.isLoading) return <Loader />;
  const user = userQuery.data;

  return (
    <Container className="grid gap-4">
      <CardMini className="w-full">
        <form action="">
          <div className="flex items-center">
            <NavLink
              exact
              to={backLink("/user/profile")}
              activeClassName="text-gray-500 pointer-events-none"
              className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
            <div className="ml-auto"></div>
            {user.privilege !== "candidate" && (
              <>
                <NavLink
                  exact
                  to="/user/requests"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Permintaan
                </NavLink>
                <NavLink
                  exact
                  to="/user/attendances"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Kehadiran
                </NavLink>
                <NavLink
                  exact
                  to="/user/assessments"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Penilaian
                </NavLink>
                <NavLink
                  exact
                  to="/user/salaries"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Slip Gaji
                </NavLink>
              </>
            )}
          </div>
        </form>
      </CardMini>
      <Switch>
        <Route exact path="/user/profile" component={UserDetail} />
        <Route exact path="/user/profile/edit" component={UserProfileForm} />
        <Route exact path="/user/educations" component={EducationPage} />
        <Route exact path="/user/experiences" component={ExperiencePage} />
        <Route path="/user/requests">
          <Switch>
            <Route exact path="/user/requests" component={UserRequestTable} />
            <Route
              exact
              path="/user/requests/create"
              component={UserRequestForm}
            />
            <Route
              exact
              path="/user/requests/:requestId"
              component={RequestDetail}
            />
          </Switch>
        </Route>
        <Route path="/user/salaries">
          <Switch>
            <Route exact path="/user/salaries" component={UserSalaryTable} />
            <Route
              exact
              path="/user/salaries/:payloadId"
              component={UserSalaryDetail}
            />
          </Switch>
        </Route>
        <Route path="/user/attendances">
          <Switch>
            <Route exact path="/user/attendances" component={UserAttendance} />
            <Route exact path="/user/attendances/scanqr" component={ScanQR} />
          </Switch>
        </Route>
        <Route path="/user/assessments">
          <Switch>
            <Route
              exact
              path="/user/assessments"
              component={UserAssessmentTable}
            />
            <Route
              exact
              path="/user/assessments/:assessmentId"
              component={AssessmentDetail}
            />
          </Switch>
        </Route>
      </Switch>
    </Container>
  );
}
