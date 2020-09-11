import Axios from "axios";

export const getPayloads = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/payloads/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postPayload = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/payloads/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const patchPayload = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/payloads/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deletePayload = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete("/payloads/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
