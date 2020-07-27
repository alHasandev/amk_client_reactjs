import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Import components
import Background from "../layout/Background";
import Container from "../layout/Container";
import { AuthContext } from "../provider/Auth";
import Loader from "../components/Loader";

const DashboardLink = () => (
  <Link
    to="/admin"
    className="inline-block mx-4 px-4 py-2 bg-yellow-500 font-bold text-black">
    DASHBOARD
  </Link>
);

const ProfileLink = () => (
  <Link
    to="/user/profile"
    className="inline-block mx-4 px-4 py-2 bg-yellow-600 font-bold text-white">
    PROFILE
  </Link>
);

export default function Home() {
  const [auth] = useContext(AuthContext);

  if (auth.isLoading) return <Loader />;

  return (
    <Background className="px-4 flex flex-col justify-center items-center text-white text-center">
      <Container className="-mt-32">
        <h1 className="text-4xl font-bold capitalize">
          Welcome {auth.user ? `Back ${auth.user.name}` : "to AMK Pyramid"}
        </h1>
        <p className="mb-4">Aplikasi Manajemen Karyawan Pyramid versi 2.0.1</p>
        <div className="">
          {auth.token ? (
            <>
              {auth.user && auth.user.privilege === "admin" ? (
                <>
                  <DashboardLink />
                  <ProfileLink />
                </>
              ) : (
                <ProfileLink />
              )}
              <Link
                to="/logout"
                className="inline-block mx-4 px-4 py-2 bg-yellow-500 font-bold text-black">
                LOGOUT
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-block mx-4 px-4 py-2 bg-yellow-500 font-bold text-black">
                SIGN IN
              </Link>
              <Link
                to="/register"
                className="inline-block mx-4 px-4 py-2 bg-yellow-600 font-bold">
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </Container>
    </Background>
  );
}
