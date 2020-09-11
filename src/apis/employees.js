import Axios from "axios";

export const getEmployees = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/employees/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postEmployee = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/employees/" + endpoint, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteEmployee = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete("/employees/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const patchEmployee = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/employees/" + endpoint, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
