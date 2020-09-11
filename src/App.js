import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

// Import components
import { AuthContext } from "./provider/Auth";
import AdminRouter from "./routes/AdminRouter";
import UserRouter from "./routes/UserRouter";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Background from "./layout/Background";
import HomePage from "./pages/Home";
import RecruitmentList from "./pages/RecruitmentList";
import RecruitmentDetail from "./pages/RecruitmentDetail";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import RegisterPage from "./pages/Register";
import Restricted from "./pages/Restricted";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PrintRouter from "./routes/PrintRouter";

function App() {
  const [auth] = useContext(AuthContext);
  console.log(auth);
  // if (auth.isLoading) return <Loader />;

  return (
    <>
      <Switch>
        <Route path="/print" component={PrintRouter} />
        <Route path="/">
          <Header />
          <ProtectedRoute
            path="*"
            hasAccess={auth.user && auth.user.privilege === "admin"}>
            <Sidebar />
          </ProtectedRoute>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/">
              <Background
                className={`px-4 ${
                  auth.user && auth.user.privilege === "admin" && "md:pl-14"
                }`}>
                <Switch>
                  {/* Admin Routes */}
                  <ProtectedRoute
                    path="/admin"
                    hasAccess={auth.user && auth.user.privilege === "admin"}
                    redirect={auth.token ? "/403" : "/login"}
                    component={AdminRouter}
                  />

                  {/* User Routes */}
                  <ProtectedRoute
                    path="/user"
                    hasAccess={!!auth.token}
                    redirect="/login"
                    component={UserRouter}
                  />

                  {/* Authroutes */}
                  <Route exact path="/logout" component={LogoutPage} />
                  <ProtectedRoute
                    exact
                    path="/login"
                    hasAccess={!auth.token}
                    redirect="/"
                    component={LoginPage}
                  />
                  <ProtectedRoute
                    exact
                    path="/register"
                    hasAccess={!auth.token}
                    redirect="/"
                    component={RegisterPage}
                  />

                  {/* Guest routes */}
                  <Route
                    exact
                    path="/recruitments"
                    component={RecruitmentList}
                  />
                  <Route
                    exact
                    path="/recruitments/:id"
                    component={RecruitmentDetail}
                  />
                </Switch>
              </Background>
            </Route>
          </Switch>
        </Route>

        {/* Forbidden routes */}
        <Route exact path="/403" component={Restricted} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
