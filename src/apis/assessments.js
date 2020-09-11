import Axios from "axios";

export const getAssessments = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/assessments/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const postAssessment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/assessments/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const patchAssessment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/assessments/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteAssessment = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete("/assessments/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
