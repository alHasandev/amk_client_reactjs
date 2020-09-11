import Axios from "axios";

export const getPositions = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/positions/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postPosition = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/positions/" + endpoint, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const patchPosition = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/positions/" + endpoint, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const deletePosition = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;

  try {
    const res = await Axios.delete("/positions/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
