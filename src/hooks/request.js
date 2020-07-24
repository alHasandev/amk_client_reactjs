import { useState, useEffect } from "react";
import axios from "axios";

export function useAxiosGet(url, params) {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("Iteration before");
  const fetchData = async (url, params, cancelToken) => {
    try {
      const res = await axios.get(url, {
        cancelToken: cancelToken.token,
        params: params,
        timeout: 12000,
      });

      setFetchedData(res.data);
      setIsLoading(false);
      // console.log("Iteration resolve");
    } catch (err) {
      console.log(err.message);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log("Iteration effect");
    const cancelToken = axios.CancelToken.source();
    fetchData(url, params, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [url, params]);

  return [fetchedData, isLoading, error];
}
