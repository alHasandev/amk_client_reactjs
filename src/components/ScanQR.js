import React, { useState } from "react";
import Container from "../layout/Container";
import QrReader from "react-qr-reader";
import { CardSmall } from "./Card";
import { postAttendance } from "../apis/attendances";
import { useHistory } from "react-router-dom";

export default function ScanQR() {
  const [isQrFound, setIsQrFound] = useState(false);
  const [result, setResult] = useState("No Result");
  const history = useHistory();

  const handleScan = async (data) => {
    if (data) {
      // setTimeout(() => {
      //   setIsQrFound(false);
      // }, 4000);
      if (!isQrFound) {
        setIsQrFound(true);
        const [qrtext, time] = data;
        const attendance = await postAttendance(
          { qrtext, time },
          {
            endpoint: "qrcode",
          }
        );
        console.log(attendance);
        if (!attendance.error) {
          alert("Berhasil melakukan scan qrcode kehadiran !!");
          history.push("/user/attendances");
        } else {
          alert(attendance.error);
          history.push("/user/attendances");
        }
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const handleLoad = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <CardSmall>
        <div
          className={`border-4 ${
            isQrFound ? "border-green-500" : "border-black"
          }`}>
          <QrReader
            delay={300}
            onLoad={handleLoad}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
            className="w-64"
          />
        </div>
      </CardSmall>
    </Container>
  );
}
