import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Redirect, useLocation, useParams } from "react-router-dom";
import Error from "../../components/Error";
import Axios from "axios";

export default function CandidateStatus() {
  const params = useParams();
  const location = useLocation();
  const [status, setStatus] = useState("ready");

  useEffect(() => {
    const data = {
      status: params.status,
    };

    const url = `/recruitments/${params.id}/candidates/${params.candidateId}`;
    const source = Axios.CancelToken.source();
    const changeStatus = async () => {
      try {
        const res = await Axios.patch(url, data, {
          cancelToken: source.token,
        });

        if (res.status === 200) setStatus("success");
        // console.log(res.data);
      } catch (err) {
        if (Axios.isCancel(err)) {
          console.log("Cancel axios request");
        } else {
          setStatus("error");
          console.log(err.response);
        }
      }
    };
    const addEmployee = async () => {
      try {
        const recruitment = await Axios.get(`/recruitments/${params.id}`);
        const newEmployee = {
          user: params.candidateId,
          department: recruitment.data.department,
          position: recruitment.data.position,
        };

        console.log(newEmployee);

        const res = await Axios.post("/employees", newEmployee, {
          cancelToken: source.token,
        });
        console.log(res.data);
      } catch (err) {
        if (Axios.isCancel(err)) {
          console.log("Cancel axios request");
        } else {
          console.log(err.response);
        }
      }
    };
    if (params.status === "hired") {
      console.log(params.status);
      addEmployee();
    }
    changeStatus();

    return () => {
      source.cancel();
    };
  }, [location, params]);

  if (status === "error")
    return <Error error={{ message: "Gagal mengubah status candidate!!" }} />;
  if (status === "success") return <Redirect to={`/admin/recruitments/`} />;

  return <Loader />;
}
