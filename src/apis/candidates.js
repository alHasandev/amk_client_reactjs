import Axios from "axios";

export const getCandidates = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/candidates/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postCandidate = async (data) => {
  try {
    const res = await Axios.post("/candidates", data);
    // alert("error 1");
    return res.data;
  } catch (err) {
    // alert("error 2");
    // console.error(err);
    throw err;
  }
};

export const patchCandidate = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    console.log(data);
    const res = await Axios.patch(`/candidates/${endpoint}`, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteCandidate = async (candidateId) => {
  try {
    const res = await Axios.delete(`/candidates/${candidateId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
