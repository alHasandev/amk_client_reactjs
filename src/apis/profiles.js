import Axios from "axios";

export const getProfiles = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/profiles/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const postProfile = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/profiles/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const patchProfile = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/profiles/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteProfile = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete("/profiles/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
