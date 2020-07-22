import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Import custom modules

// Import components
import Background from "../layout/Background";
import Container from "../layout/Container";
import { CardSmall } from "../components/Card";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (ev) =>
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (formData.email && formData.password) {
      console.log(formData);
      history.push("/");
    } else {
      alert("Please input email or password correctly!!");
    }
  };

  return (
    <Background className="px-4">
      <Container>
        <CardSmall>
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-yellow-700 text-2xl">Sign Up</h1>
            <p className="text-gray-500 text-sm mb-4">
              Sign up to create your account
            </p>

            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">NIK</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
                placeholder="Same as your national id card's id..."
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
                placeholder="Your full name..."
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
                placeholder="Your @email..."
              />
            </div>

            <div className="grid md:grid-cols-2 col-gap-4 mb-6">
              <div className="">
                <label className="block font-bold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
                  placeholder="Your *password..."
                />
              </div>
              <div className="">
                <label className="block font-bold text-gray-700 mb-2">
                  Verify Password
                </label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 hover:border-yellow-700"
                  placeholder="Type your *password again..."
                />
              </div>
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
    </Background>
  );
}
