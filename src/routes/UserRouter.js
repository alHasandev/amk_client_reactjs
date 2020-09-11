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
import { getMyProfile } from "../apis/users";
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
  // const { data: user, isLoading } = useQuery("myProfile", getMyProfile);

  // const [topbars, setTopbars] = useState([]);

  // useEffect(() => {
  //   if (user) {
  //     switch (user.privilege) {
  //       case "employee":
  //       case "admin":
  //         setTopbars([
  //           {
  //             to: "/user/requests",
  //             label: "Permintaan",
  //             className: BTN_COLOR.YELLOW_LIGHT,
  //           },
  //           {
  //             to: "/user/salaries",
  //             label: "Slip Gaji",
  //             className: BTN_COLOR.YELLOW_MEDIUM,
  //           },
  //           {
  //             to: "/user/attendances",
  //             label: "Kehadiran",
  //             className: BTN_COLOR.YELLOW_LIGHT,
  //           },
  //           {
  //             to: "/user/print",
  //             label: "Cetak Profile",
  //             className: BTN_COLOR.YELLOW_LIGHT,
  //           },
  //         ]);
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }, [user]);

  // if (isLoading) return <Loader />;

  return (
    <Container className="grid gap-4">
      {/* <Topbar homeLink="/user/profile" links={topbars} className="mb-4" /> */}
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
          </div>
        </form>
      </div>
      <Switch>
        <Route exact path="/user/profile" component={UserDetail} />
        <Route exact path="/user/profile/edit" component={UserProfileForm} />
        <Route exact path="/user/educations" component={EducationPage} />
        <Route exact path="/user/experiences" component={ExperiencePage} />
        <Route path="/user/requests">
          <UserRequest>
            <Switch>
              <Route exact path="/user/requests" component={UserRequestTable} />
              <Route
                exact
                path="/user/requests/create"
                component={UserRequestForm}
              />
            </Switch>
          </UserRequest>
        </Route>
        <Route path="/user/salaries">
          <UserRequest>
            <Switch>
              <Route exact path="/user/salaries" component={UserSalaryTable} />
              <Route
                exact
                path="/user/salaries/:payloadId"
                component={UserSalaryDetail}
              />
            </Switch>
          </UserRequest>
        </Route>
        <Route exact path="/user/attendances">
          <UserAttendance />
        </Route>
        <Route exact path="/user/attendances/scanqr" component={ScanQR} />
      </Switch>
    </Container>
  );
}
