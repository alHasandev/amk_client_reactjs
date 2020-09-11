import Axios from "axios";

export const getRequests = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    console.log(params);
    const res = await Axios.get("/requests/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postRequest = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/requests/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const patchRequest = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/requests/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteRequest = async (requestId) => {
  try {
    const res = await Axios.delete(`/requests/${requestId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
