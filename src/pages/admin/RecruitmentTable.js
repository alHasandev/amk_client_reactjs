import React from "react";
import Card from "../../components/Card";
import Background from "../../layout/Background";
import Container from "../../layout/Container";
import { Link } from "react-router-dom";

export default function RecruitmentTable() {
  return (
    <Background className="px-4">
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
              <tr>
                <td className="py-2 px-4 border text-center">NO.</td>
                <td className="py-2 px-4 border">POSITION</td>
                <td className="py-1 px-4 border text-center">
                  <Link
                    to="/admin/recruitments/1"
                    className="rounded font-bold bg-yellow-400 hover:bg-yellow-600 hover:text-white py-1 px-2">
                    12
                  </Link>
                </td>
                <td className="py-2 px-4 border text-center">0 / 2</td>
                <td className="py-2 px-4 border text-center">
                  11/12/2020 ~ 31/12/2020
                </td>
                <td className="py-2 px-4 border text-center">
                  <Link
                    to="/candidates"
                    className="rounded font-bold text-white bg-green-500 hover:bg-green-700 py-1 px-2">
                    OPEN
                  </Link>
                </td>
                <td className="py-2 px-4 border text-center">
                  <Link
                    to="/candidates"
                    className="rounded font-bold bg-green-500 hover:bg-green-600 text-white py-1 px-2 mr-2">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Link
                    to="/candidates"
                    className="rounded font-bold bg-red-500 hover:bg-red-600 text-white py-1 px-2">
                    <i className="fas fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Container>
    </Background>
  );
}
