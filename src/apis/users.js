import Axios from "axios";

export const getUsers = async (key, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.get("/users/" + endpoint, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const postUser = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.post("/users/" + endpoint, data, {
      params: params,
      ...config,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const patchUser = async (data, options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;
  try {
    const res = await Axios.patch("/users/" + endpoint, data, {
      params: params,
      ...config,
    });
    console.log("patch user");
    return res.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteUser = async (options = {}) => {
  const { endpoint = "", params = {}, ...config } = options;

  try {
    const res = await Axios.delete(`/users/${endpoint}`, {
      params: params,
      ...config,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
