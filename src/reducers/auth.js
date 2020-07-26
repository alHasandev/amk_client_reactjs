import axios from "axios";

export const ACTIONS = {
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAIL: "login_fail",
  LOGIN: "login",
  MAKE_REQUEST: "make_request",
  END_REQUEST: "end_request",
  SET_USER: "set_user",
  REMOVE_ERROR: "remove_error",
  LOGOUT: "logout",
};

export function setAuthToken(token) {
  if (token) {
    console.log("create token");
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    console.log("delete token");
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default function auth(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      // setAuthToken(action.payload.token);
      console.log("login success");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
      };

    case ACTIONS.LOGIN:
      // setAuthToken(action.payload.token);
      console.log("login");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isLoading: true,
      };

    case ACTIONS.SET_USER:
      console.log("set user");
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };

    case ACTIONS.LOGIN_FAIL:
      setAuthToken(false);
      console.log("login fail");
      localStorage.removeItem("token");
      return {
        error: action.payload.error,
        token: null,
        user: null,
        isLoading: false,
      };

    case ACTIONS.REMOVE_ERROR:
      console.log("remove error");
      return {
        ...state,
        error: null,
      };

    case ACTIONS.MAKE_REQUEST:
      return { ...state, isLoading: true };

    case ACTIONS.END_REQUEST:
      return { ...state, isLoading: false };

    case ACTIONS.LOGOUT:
      setAuthToken(false);
      console.log("logout");
      localStorage.removeItem("token");
      return { ...state, token: null, user: null, isLoading: false };

    default:
      return state;
  }
}
