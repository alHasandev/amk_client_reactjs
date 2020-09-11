import React from "react";
import { Route, Switch } from "react-router-dom";
import PrintAttendance from "../pages/print/Attendance";
import PrintRecruitment from "../pages/print/Recruitment";

export default function PrintRouter() {
  return (
    <Switch>
      <Route
        exact
        path="/print/attendance/:employeeId"
        component={PrintAttendance}
      />
      <Route
        exact
        path="/print/recruitments/:status"
        component={PrintRecruitment}
      />
    </Switch>
  );
}
