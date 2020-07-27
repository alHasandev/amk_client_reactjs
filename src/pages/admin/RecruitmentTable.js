import React from "react";
import Card, { CardSmall } from "../../components/Card";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";
import { useAxiosGet, useAxios } from "../../hooks/request";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import usePopUp from "../../components/usePopUp";

export default function RecruitmentTable() {
  const [res, resStatus, method] = useAxios("/recruitments");
  const [recruitments, isLoading, error, handler] = useAxiosGet(
    "/recruitments"
  );

  const [PopUpWrapper, popUpState, popUpHandler] = usePopUp({
    collapse: true,
  });

  const changeStatus = (status) => {
    console.log(popUpState, status);
    method.update({ status }, `/${popUpState}`, (r) => {
      handler.resync();
      popUpHandler(true, null);
    });
  };

  if (error) return <Error error={error} />;
  if (resStatus === "error" && !!res) return <Error error={res} />;
  if (isLoading || resStatus === "requesting") return <Loader />;
  if (!recruitments) return <h1>Data not found 404</h1>;

  const statusColors = {
    open: "text-white bg-green-500 hover:bg-green-700",
    pending: "text-black bg-yellow-400 hover:bg-yellow-600",
    close: "text-black bg-gray-200 hover:bg-gray-400",
  };

  return (
    <>
      <PopUpWrapper>
        <CardSmall className="mt-8">
          <h1 className="text-center font-bold text-xl text-gray-900 mb-4">
            Ubah Status Recruitment ?
          </h1>
          <div className="flex justify-center">
            <button
              onClick={() => changeStatus("open")}
              className="inline-block bg-green-500 font-semibold uppercase text-white px-4 py-2 rounded-sm shadow-sm">
              open
            </button>
            <button
              onClick={() => changeStatus("pending")}
              className="inline-block bg-yellow-400 font-semibold uppercase text-black px-4 py-2 rounded-sm shadow-sm mx-4">
              pending
            </button>
            <button
              onClick={() => changeStatus("close")}
              className="inline-block bg-gray-400 font-semibold uppercase text-black px-4 py-2 rounded-sm shadow-sm">
              close
            </button>
          </div>
        </CardSmall>
      </PopUpWrapper>
      <Container className="grid gap-4">
        <div className="bg-white px-4 py-2 rounded-sm shadow-md">
          <form action="">
            <div className="flex items-center">
              <Link to="/admin/users" className="mr-4">
                <i className="fas fa-arrow-left"></i>
              </Link>
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="px-4 py-1 bg-gray-200 focus:outline-none rounded-sm w-full"
              />
              <Link
                to={`/admin/recruitments/create`}
                className="inline-block whitespace-no-wrap bg-yellow-400 hover:bg-yellow-600 hover:text-white font-semibold text-sm text-black px-4 py-1 rounded-sm ml-4">
                New Recruitment
              </Link>
            </div>
          </form>
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 pb-4">NO.</th>
                <th className="py-2 px-4 pb-4">POSITION</th>
                <th className="py-2 px-4 pb-4">CANDIDATES</th>
                <th className="py-2 px-4 pb-4">HIRED</th>
                <th className="py-2 px-4 pb-4">DATE</th>
                <th className="py-2 px-4 pb-4">STATUS</th>
                <th className="py-2 px-4 pb-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recruitments.map((recruitment, index) => (
                <tr key={recruitment._id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {recruitment.positionName}
                  </td>
                  <td className="py-1 px-4 border text-center">
                    <Link
                      to={`/admin/recruitments/${recruitment._id}`}
                      className="inline-block rounded font-bold bg-yellow-400 text-sm hover:bg-yellow-600 hover:text-white py-1 px-2">
                      {recruitment.candidates.length}
                    </Link>
                  </td>
                  <td className="py-1 px-4 border text-center">
                    <Link
                      to={`/admin/recruitments/${recruitment._id}/hired`}
                      className="inline-block rounded font-bold bg-yellow-600 text-sm hover:bg-yellow-700 text-white py-1 px-2 whitespace-no-wrap">
                      {recruitment.hired.length} / {recruitment.numberRequired}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {new Date(recruitment.createdAt).toLocaleDateString(
                      "id-ID"
                    )}{" "}
                    -{" "}
                    {new Date(recruitment.expiredAt).toLocaleDateString(
                      "id-ID"
                    )}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      to="/candidates"
                      onClick={(ev) => popUpHandler(false, recruitment._id)}
                      className={`inline-block rounded font-semibold text-xs py-1 px-2 uppercase ${
                        statusColors[recruitment.status]
                      }`}>
                      {recruitment.status}
                    </button>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <Link
                      to="/candidates"
                      className="inline-block rounded font-bold bg-green-500 hover:bg-green-600 text-white py-1 px-2 md:mr-2">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link
                      to="/candidates"
                      className="inline-block rounded font-bold bg-red-500 hover:bg-red-600 text-white py-1 px-2">
                      <i className="fas fa-trash-alt"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Container>
    </>
  );
}
