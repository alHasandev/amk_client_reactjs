import axios from "axios";

export const ACTIONS = {
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAIL: "login_fail",
  MAKE_REQUEST: "make_request",
  LOGIN: "login",
  LOGOUT: "logout",
  INCREMENT: "increment",
};

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default function auth(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      setAuthToken(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return { ...state, data: action.payload.token, isLoading: false };

    case ACTIONS.LOGIN_FAIL:
      setAuthToken(false);
      localStorage.removeItem("token");
      return { ...state, data: null, isLoading: false };

    case ACTIONS.MAKE_REQUEST:
      return { ...state, isLoading: true };

    case ACTIONS.LOGIN:
      localStorage.setItem("token", action.payload.token);
      return { ...state, data: action.payload.token, isLoading: false };

    case ACTIONS.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, data: null, isLoading: false };

    case ACTIONS.INCREMENT:
      return {
        ...state,
        isLoading: false,
        data: state.data + action.payload.incrementBy,
      };

    default:
      return state;
  }
}
