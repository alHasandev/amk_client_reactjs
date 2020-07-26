import React from "react";
import { Switch, Route } from "react-router-dom";

// Import components
import CandidateList from "../pages/CandidateList";
import Dashboard from "../pages/admin/Dashboard";
import RecruitmentTable from "../pages/admin/RecruitmentTable";
import Department from "../pages/admin/Department";
import Employee from "../pages/admin/Employee";
import User from "../pages/admin/User";
import DepartmentForm from "../components/DepartmentForm";
import PositionForm from "../components/PositionForm";
import UserForm from "../components/UserForm";
import RecruitmentForm from "../components/RecruitmentForm";

export default function AdminRouter() {
  return (
    <Switch>
      <Route exact path="/admin" component={Dashboard} />
      <Route
        exact
        path="/admin/recruitments/create"
        component={RecruitmentForm}
      />
      <Route exact path="/admin/recruitments" component={RecruitmentTable} />
      <Route exact path="/admin/recruitments/:id" component={CandidateList} />
      <Route exact path="/admin/departments" component={Department} />
      <Route
        exact
        path="/admin/departments/create"
        component={DepartmentForm}
      />
      <Route exact path="/admin/departments/:id" component={Department} />
      <Route
        exact
        path="/admin/departments/:id/create"
        component={PositionForm}
      />
      <Route exact path="/admin/employees" component={Employee} />
      <Route exact path="/admin/users" component={User} />
      <Route exact path="/admin/users/create" component={UserForm} />
    </Switch>
  );
}
