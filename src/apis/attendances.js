import Axios from "axios";

export const getAttendances = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/attendances/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const postAttendance = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/attendances/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};
