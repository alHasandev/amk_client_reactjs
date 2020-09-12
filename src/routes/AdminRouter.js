import React from "react";
import { Switch, Route } from "react-router-dom";

// Import components
import CandidateList from "../pages/CandidateList";
import Dashboard from "../pages/admin/Dashboard";
import RecruitmentTable from "../components/RecruitmentTable";
import DepartmentPage from "../pages/admin/Department";
import EmployeePage from "../pages/admin/Employee";
import UserPage from "../pages/admin/User";
import DepartmentForm from "../components/DepartmentForm";
import PositionForm from "../components/PositionForm";
import UserForm from "../components/UserForm";
import RecruitmentForm from "../components/RecruitmentForm";
import CandidateStatus from "../pages/admin/CandidateStatus";
import HiredPage from "../pages/admin/Hired";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import Attendance from "../pages/admin/Attendance";
import AttendanceForm from "../components/AttendanceForm";
import RequestPage from "../pages/admin/Request";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";
import CandidateTable from "../components/CandidateTable";
import AssessmentPage from "../pages/admin/Assessment";
import AssessmentTable from "../components/AssessmentTable";
import AssessmentForm from "../components/AssessmentForm";
import UserTable from "../components/UserTable";
import PayloadPage from "../pages/admin/Payload";
import PayloadTable from "../components/PayloadTable";
import PayloadForm from "../components/PayloadForm";
import QRView from "../components/QRView";
import DepartmentTable from "../components/DepartmentTable";
import PositionTable from "../components/PositionTable";
import RecruitmentPage from "../pages/admin/RecruitmentPage";
import RecruitmentDetail from "../components/RecruitmentDetail";
import CandidateDetail from "../components/CandidateDetail";
import CandidatePage from "../pages/admin/CandidatePage";
import RequestDetail from "../components/RequestDetail";
import AttendancePage from "../pages/admin/AttendancePage";

export default function AdminRouter() {
  return (
    <Switch>
      <Route exact path="/admin" component={Dashboard} />
      <Route path="/admin/requests">
        <RequestPage>
          <Switch>
            <Route exact path="/admin/requests" component={RequestTable} />
            <Route
              exact
              path="/admin/requests/create"
              component={RequestForm}
            />
            <Route
              exact
              path="/admin/requests/edit/:requestId"
              component={RequestForm}
            />
            <Route
              exact
              path="/admin/requests/:requestId"
              component={RequestDetail}
            />
          </Switch>
        </RequestPage>
      </Route>
      <Route exact path="/admin/qrview" component={QRView} />
      <Route path="/admin/recruitments">
        <RecruitmentPage>
          <Switch>
            <Route
              exact
              path="/admin/recruitments"
              component={RecruitmentTable}
            />
            <Route
              exact
              path="/admin/recruitments/create"
              component={RecruitmentForm}
            />
            <Route
              exact
              path="/admin/recruitments/edit/:recruitmentId"
              component={RecruitmentForm}
            />
            <Route
              exact
              path="/admin/recruitments/:recruitmentId"
              component={RecruitmentDetail}
            />
            <Route
              exact
              path="/admin/recruitments/:id/candidates"
              component={CandidateList}
            />
            <Route
              exact
              path="/admin/recruitments/:id/candidates/:candidateId"
              component={CandidateList}
            />
            <Route
              exact
              path="/admin/recruitments/:id/candidates/:candidateId/:status"
              component={CandidateStatus}
            />
            <Route
              exact
              path="/admin/recruitments/:id/hireds"
              component={HiredPage}
            />
          </Switch>
        </RecruitmentPage>
      </Route>
      <Route path="/admin/candidates">
        <CandidatePage>
          <Switch>
            <Route exact path="/admin/candidates" component={CandidateTable} />
            <Route
              exact
              path="/admin/candidates/:candidateId"
              component={CandidateDetail}
            />
          </Switch>
        </CandidatePage>
      </Route>
      <Route path="/admin/departments">
        <DepartmentPage>
          <Switch>
            <Route
              exact
              path="/admin/departments"
              component={DepartmentTable}
            />
            <Route
              exact
              path="/admin/departments/create"
              component={DepartmentForm}
            />
            <Route
              exact
              path="/admin/departments/edit/:departmentId"
              component={DepartmentForm}
            />
            <Route
              exact
              path="/admin/departments/:departmentId/create"
              component={PositionForm}
            />
            <Route
              exact
              path="/admin/departments/:departmentId/:positionId"
              component={PositionForm}
            />
            <Route exact path="/admin/departments/:departmentId">
              <DepartmentTable />
              <PositionTable />
            </Route>
          </Switch>
        </DepartmentPage>
      </Route>
      <Route path="/admin/employees">
        <EmployeePage>
          <Switch>
            <Route exact path="/admin/employees/" component={EmployeeTable} />
            <Route
              exact
              path="/admin/employees/create"
              component={EmployeeForm}
            />
            <Route
              exact
              path="/admin/employees/edit/:employeeId"
              component={EmployeeForm}
            />
          </Switch>
        </EmployeePage>
      </Route>
      <Route path="/admin/attendances">
        <AttendancePage>
          <Switch>
            <Route exact path="/admin/attendances" component={Attendance} />
            <Route
              exact
              path="/admin/attendances/create"
              component={AttendanceForm}
            />
          </Switch>
        </AttendancePage>
      </Route>
      <Route path="/admin/payloads">
        <PayloadPage>
          <Switch>
            <Route exact path="/admin/payloads/" component={PayloadTable} />
            <Route
              exact
              path="/admin/payloads/create"
              component={PayloadForm}
            />
            <Route
              exact
              path="/admin/payloads/:payloadId"
              component={PayloadForm}
            />
          </Switch>
        </PayloadPage>
      </Route>
      <Route path="/admin/assessments">
        <AssessmentPage>
          <Switch>
            <Route
              exact
              path="/admin/assessments/"
              component={AssessmentTable}
            />
            <Route
              exact
              path="/admin/assessments/create"
              component={AssessmentForm}
            />
            <Route
              exact
              path="/admin/assessments/edit/:assessmentId"
              component={AssessmentForm}
            />
          </Switch>
        </AssessmentPage>
      </Route>
      <Route path="/admin/users">
        <UserPage>
          <Switch>
            <Route exact path="/admin/users" component={UserTable} />
            <Route exact path="/admin/users/create" component={UserForm} />
            <Route exact path="/admin/users/:userId" component={UserForm} />
          </Switch>
        </UserPage>
      </Route>
    </Switch>
  );
}
