import Axios from "axios";

export const getDepartments = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/departments/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    return JSON.stringify(err);
  }
};
export const postDepartment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/departments/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    return JSON.stringify(err);
  }
};
export const patchDepartment = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/departments/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    return JSON.stringify(err);
  }
};
export const deleteDepartment = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.delete("/departments/" + endpoint, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    return JSON.stringify(err);
  }
};
