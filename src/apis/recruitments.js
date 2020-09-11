import Axios from "axios";

export const getRecruitments = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/recruitments/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postRecruitment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/recruitments/" + endpoint, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const patchRecruitment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch(`/recruitments/${endpoint}`, data, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteRecruitment = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete(`/recruitments/${endpoint}`, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
