import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      console.log(action);
      return { isLoading: true, data: null };

    case ACTIONS.GET_DATA:
      console.log(action);
      return { ...state, isLoading: false, data: action.payload.data };

    case ACTIONS.ERROR:
      console.log(ACTIONS);
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        data: null,
      };

    default:
      return state;
  }
}

export default function useAxios(url, params) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  const cancelTokenPost = axios.CancelToken.source();
  const cancelTokenDelete = axios.CancelToken.source();

  const save = async (url, data) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    try {
      const res = await axios.post(url, data, {
        cancelToken: cancelTokenPost.token,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { data: [...state.data, res.data] },
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
    }
  };

  const update = async (url, id, data) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    try {
      const res = await axios.patch(url + id, data, {
        cancelToken: cancelTokenPost.token,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const updatedData = state.data.map((data) =>
        data.id !== id ? data : res.data
      );

      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { data: updatedData },
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
    }
  };

  const remove = async (url, id) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    try {
      const res = await axios.delete(url + id, {
        cancelToken: cancelTokenDelete.token,
      });

      const remainingData = state.data.filter((data) => data.id !== id);

      dispatch({
        type: ACTIONS.GET_DATA,
        payload: { data: remainingData },
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
    }
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(url, {
        cancelToken: cancelToken.token,
        params: {
          ...params,
        },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { data: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelTokenPost.cancel();
      cancelTokenDelete.cancel();
      cancelToken.cancel();
    };
  }, [url, params]);

  return {
    state: [state.data, state.isLoading, state.error],
    request: { save, update, remove },
  };
}
