import React from "react";
import Card from "../../components/Card";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";
import { useAxiosGet } from "../../hooks/request";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default function RecruitmentTable() {
  const [recruitments, isLoading, error] = useAxiosGet("/recruitments");

  if (error) return <Error error={error} />;
  if (isLoading) return <Loader />;
  if (!recruitments) return <h1>Data not found 404</h1>;

  const statusColors = {
    open: "text-white bg-green-500 hover:bg-green-700",
    pending: "text-black bg-yellow-400 hover:bg-yellow-600",
    close: "text-black bg-gray-200 hover:bg-gray-400",
  };

  return (
    <Container className="md:ml-10">
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
                <td className="py-2 px-4 border">{recruitment.positionName}</td>
                <td className="py-1 px-4 border text-center">
                  <Link
                    to={`/admin/recruitments/${recruitment._id}`}
                    className="rounded font-bold bg-yellow-400 hover:bg-yellow-600 hover:text-white py-1 px-2">
                    {recruitment.candidates.length}
                  </Link>
                </td>
                <td className="py-2 px-4 border text-center">
                  {recruitment.hired.length} / {recruitment.numberRequired}
                </td>
                <td className="py-2 px-4 border text-center">
                  {new Date(recruitment.createdAt).toLocaleDateString("id-ID")}{" "}
                  -{" "}
                  {new Date(recruitment.expiredAt).toLocaleDateString("id-ID")}
                </td>
                <td className="py-2 px-4 border text-center">
                  <Link
                    to="/candidates"
                    className={`rounded font-semibold text-xs py-1 px-2 uppercase ${
                      statusColors[recruitment.status]
                    }`}>
                    {recruitment.status}
                  </Link>
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
  );
}
