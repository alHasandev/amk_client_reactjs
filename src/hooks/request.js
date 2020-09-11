import { useState, useEffect } from "react";
import axios from "axios";

export function useAxiosGet(url) {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("Iteration before");
  const fetchData = async (url, cancelToken) => {
    console.log("Loading");
    try {
      console.log(url);
      setIsLoading(true);
      const res = await axios.get(url, {
        cancelToken: cancelToken.token,
        timeout: 12000,
      });

      setFetchedData(res.data);
      setIsLoading(false);
      // console.log("Iteration resolve");
    } catch (err) {
      console.log("canceled");
      if (axios.isCancel()) return setIsLoading(false);
      console.log(err.message);
      setError(err);
      setIsLoading(false);
    }
  };

  const resync = () => {
    const cancelToken = axios.CancelToken.source();
    fetchData(url, cancelToken);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    fetchData(url, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [url]);

  return [fetchedData, isLoading, error, { resync }];
}

export function useAxios(url, params = {}) {
  const [config] = useState({ url, params });
  const [status, setStatus] = useState("ready");
  const [response, setResponse] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);

  const save = async (data, postUrl = "") => {
    try {
      setStatus("requesting");
      const res = await axios.post(config.url + postUrl, JSON.stringify(data), {
        cancelToken: cancelToken.token,
        params: config.params,
      });
      setStatus("success");
      console.log(res.data);
      setResponse(res.data);
    } catch (err) {
      setStatus("error");
      console.error(err);
      setResponse(err);
    }
  };

  const update = async (data, postUrl = "", cb = () => {}) => {
    try {
      setStatus("requesting");
      const res = await axios.patch(config.url + postUrl, data, {
        cancelToken: cancelToken.token,
        params: config.params,
      });
      setStatus("success");
      console.log(res.data);
      setResponse(res.data);
      cb(res.data);
    } catch (err) {
      setStatus("error");
      console.error(err);
      setResponse(err);
      cb(err);
    }
  };

  const remove = async (postUrl = "") => {
    try {
      setStatus("requesting");
      const res = await axios.delete(config.url + postUrl, {
        cancelToken: cancelToken.token,
        params: config.params,
      });
      setStatus("success");
      console.log(res.data);
      setResponse(res.data);
    } catch (err) {
      setStatus("error");
      console.error(err);
      setResponse(err);
    }
  };

  useEffect(() => {
    const token = axios.CancelToken.source();
    setCancelToken(token);
    return () => {
      console.log("canceling axios request");
      token.cancel("canceling axios request");
    };
  }, []);

  return [response, status, { save, update, remove }];
}
