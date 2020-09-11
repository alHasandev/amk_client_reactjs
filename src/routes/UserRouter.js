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
      <div className="bg-white px-4 py-2 rounded-sm shadow-md w-full max-w-screen-lg mx-auto">
        <form action="">
          <div className="flex items-center">
            <NavLink
              exact
              to="/user/profile"
              activeClassName="text-gray-500 pointer-events-none"
              className="mr-4">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
            <div className="ml-auto"></div>
            {user.privilege !== "candidate" && (
              <>
                <NavLink
                  to="/user/requests"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Permintaan
                </NavLink>
                <NavLink
                  to="/user/attendances"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Kehadiran
                </NavLink>
                <NavLink
                  to="/user/assessments"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Penilaian
                </NavLink>
                <NavLink
                  to="/user/salaries"
                  activeClassName="pointer-events-none bg-yellow-700"
                  className="px-4 py-1 font-semibold text-sm bg-yellow-600 text-white hover:bg-yellow-700 rounded-sm shadow-sm ml-4">
                  Slip Gaji
                </NavLink>
              </>
            )}
          </div>
        </form>
      </div>
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
        <Route exact path="/user/attendances">
          <UserAttendance />
        </Route>
        <Route exact path="/user/attendances/scanqr" component={ScanQR} />
      </Switch>
    </Container>
  );
}
