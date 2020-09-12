import React, { useEffect } from "react";
import Container from "../layout/Container";
import QRCode from "qrcode.react";
import { CardMedium, CardSmall } from "./Card";
import { useQuery } from "react-query";
import { getAttendances } from "../apis/attendances";
import Loader from "../components/Loader";
import { useState } from "react";

export default function QRView() {
  const [limit, setLimit] = useState(30);
  const qrcode = useQuery(
    [
      "attendances",
      {
        endpoint: "qrcode",
      },
    ],
    getAttendances
  );

  console.log("view qrcode", qrcode);

  useEffect(() => {
    let t;
    if (limit <= 0) {
      qrcode.refetch().then((data) => {
        setLimit(30);
      });
    } else if (limit > 0) {
      t = setTimeout(() => {
        setLimit((limit) => limit - 1);
      }, 1000);
    }

    return () => clearTimeout(t);
  }, [limit, qrcode]);

  if (qrcode.isLoading) return <Loader />;

  return (
    <Container>
      <CardSmall className="flex flex-col md:flex-row items-center md:items-start">
        <div className="p-2 border-4 border-black mb-4 md:mb-0">
          <QRCode value={`${JSON.stringify(qrcode.data)}`} size={256} />
        </div>
        <div className="ml-auto"></div>
        <div className="md:ml-4">
          <h1 className="font-bold text-2xl text-yellow-600 text-center mb-8">
            Scan QR Kehadiran pada menu Profile, Kehadiran
          </h1>
          <p className="font-semibold text-gray-700 text-center">
            QR Code akan diperbaharui dalam:{" "}
          </p>
          <h3 className="font-bold text-6xl text-black text-center">{limit}</h3>
        </div>
      </CardSmall>
    </Container>
  );
}
