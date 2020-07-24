import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

// Import custom modules

// Import components
import Container from "../layout/Container";
import { CardSmall } from "../components/Card";
import { AuthContext } from "../provider/Auth";
import { ACTIONS } from "../reducers/auth";

export default function Login() {
  // const [auth, setAuth] = useLocalStorage("auth", "");

  const [auth, dispatch] = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (formData.email && formData.password) {
      dispatch({ type: ACTIONS.MAKE_REQUEST });

      try {
        const res = await axios.post("/auth", {
          email: formData.email,
          password: formData.password,
        });
        dispatch({
          type: ACTIONS.LOGIN_SUCCESS,
          payload: { token: res.data.accessToken },
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: ACTIONS.LOGIN_FAIL });
      }
    } else {
      alert("Please input email or password correctly!!");
    }
  };

  if (auth.data) return <Redirect to="/" />;
  if (auth.isLoading) return <h1>Loading...</h1>;

  return (
    <Container>
      <CardSmall>
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-yellow-700 text-2xl">Sign In</h1>
          <p className="text-gray-500 text-sm mb-4">
            Sign in with your account
          </p>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
              placeholder="Your @email..."
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
              placeholder="Your *password..."
            />
          </div>

          <div className="flex">
            <Link
              to="/"
              className="inline-block bg-yellow-800 text-white hover:bg-yellow-900 rounded-sm font-bold px-4 py-2">
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-block bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white rounded-sm font-bold px-4 py-2 ml-auto">
              Sign In
            </button>
          </div>
        </form>
      </CardSmall>
    </Container>
  );
}
