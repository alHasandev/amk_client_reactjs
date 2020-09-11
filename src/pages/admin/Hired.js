// Import modules
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Axios from "axios";

// Import components
import Container from "../../layout/Container";
import { CardLarge } from "../../components/Card";
import Loader from "../../components/Loader";

// Import utilities
import { BTN_COLOR } from "../../assets";

const getHireds = async (key, recruitmentId) => {
  try {
    const res = await Axios.get(
      `/recruitments/${recruitmentId}/candidates?status=hired`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getRecruitment = async (key, recruitmentId) => {
  try {
    const res = await Axios.get(`/recruitments/${recruitmentId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function Hired() {
  const params = useParams();
  const hireds = useQuery(["hireds", params.id], getHireds);
  const recruitment = useQuery(["recruitment", params.id], getRecruitment);

  console.log(recruitment);

  if (hireds.isLoading || recruitment.isLoading) return <Loader />;

  return (
    <Container>
      <CardLarge className="mb-4">
        <table>
          <thead>
            <tr>
              <th className="px-2 md:px-4 py-2 border">Posisi:</th>
              <th className="px-2 md:px-4 py-2 border">
                {recruitment.data.positionName}
              </th>
            </tr>
          </thead>
        </table>
      </CardLarge>
      <CardLarge>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2 md:px-4 py-2 border">NO.</th>
              <th className="px-2 md:px-4 py-2 border">Image</th>
              <th className="px-2 md:px-4 py-2 border">Nama</th>
              <th className="px-2 md:px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {hireds.data &&
              hireds.data.map((hired, index) => (
                <tr key={hired._id}>
                  <td className="px-2 md:px-4 py-2 border text-center">
                    {index + 1}
                  </td>
                  <td className="px-2 md:px-4 py-2 border">{hired.image}</td>
                  <td className="px-2 md:px-4 py-2 border">{hired.name}</td>
                  <td className="px-2 md:px-4 py-2 border text-center">
                    <button
                      className={`px-4 py-1 font-semibold rounded-sm ${BTN_COLOR.YELLOW_LIGHT}`}>
                      Appoint as Employee
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardLarge>
    </Container>
  );
}
