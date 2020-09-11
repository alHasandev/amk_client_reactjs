import React, { useEffect } from "react";
import Container from "../layout/Container";
import QRCode from "qrcode.react";
import { CardMedium } from "./Card";
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
  }, [limit]);

  if (qrcode.isLoading) return <Loader />;

  return (
    <Container>
      <CardMedium className="flex">
        <div className="p-2 border-4 border-black">
          <QRCode
            value={`${qrcode.data.text}|${qrcode.data.time}`}
            size={256}
          />
        </div>
        <div className="ml-auto"></div>
        <div className="ml-4">
          <h1 className="font-bold text-2xl text-yellow-600 text-center mb-8">
            Scan QR Kehadiran pada menu Profile, Kehadiran
          </h1>
          <p className="font-semibold text-gray-700 text-center">
            QR Code akan diperbaharui dalam:{" "}
          </p>
          <h3 className="font-bold text-6xl text-black text-center">{limit}</h3>
        </div>
      </CardMedium>
    </Container>
  );
}
