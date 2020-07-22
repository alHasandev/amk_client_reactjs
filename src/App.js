import React from "react";
import { Route, Switch } from "react-router-dom";

// Import components
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import HomePage from "./pages/Home";
import RecruitmentList from "./pages/RecruitmentList";
import RecruitmentDetail from "./pages/RecruitmentDetail";
import CandidateList from "./pages/CandidateList";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import RecruitmentTable from "./pages/admin/RecruitmentTable";
import Department from "./pages/admin/Department";
import Employee from "./pages/admin/Employee";
import User from "./pages/admin/User";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Route exact path="/" component={HomePage} />
      <Switch>
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/recruitments" component={RecruitmentTable} />
        <Route exact path="/admin/recruitments/:id" component={CandidateList} />
        <Route exact path="/admin/departments" component={Department} />
        <Route exact path="/admin/employees" component={Employee} />
        <Route exact path="/admin/users" component={User} />
        <Route exact path="/recruitments" component={RecruitmentList} />
        <Route exact path="/recruitments/:id" component={RecruitmentDetail} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
