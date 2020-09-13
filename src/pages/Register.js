import React, { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

// Import custom modules

// Import components
import Container from "../layout/Container";
import { CardSmall } from "../components/Card";
import { postUser } from "../apis/users";
import Loader from "../components/Loader";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    email: "",
    password: "",
    password2: "",
    image: "",
  });

  const history = useHistory();

  const inputImage = useRef(null);

  const handleChange = (ev) =>
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (
      formData.email &&
      formData.password &&
      formData.password === formData.password2
    ) {
      setIsLoading(true);
      // Build form data
      const formBuild = new FormData();
      formBuild.append("nik", formData.nik);
      formBuild.append("name", formData.name);
      formBuild.append("email", formData.email);
      formBuild.append("password", formData.password);
      formBuild.append("image", inputImage.current.files[0], formData.nik);

      if (
        await postUser(formBuild, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        })
      ) {
        setIsLoading(false);
        alert("Akun berhasil dibuat, silahkan login");
        console.log(formBuild);
        history.push("/user/profile");
      } else {
        setIsLoading(false);
        alert("Gagal melakukan registrasi, silahkan coba beberapa saat lagi!");
        console.log(formBuild);
      }
    } else {
      alert("Tolong masukan email dan password dengan benar!!");
    }
  };

  if (isLoading) return <Loader />;

  return (
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
              name="nik"
              value={formData.nik}
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
            <label className="block font-bold text-gray-700 mb-2">Email</label>
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

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">Image</label>
            <input
              type="file"
              name="image"
              ref={inputImage}
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
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
