import React from "react";
import { CardSmall } from "./Card";
import Container from "../layout/Container";
import { Link } from "react-router-dom";

export default function UserForm() {
  return (
    <Container>
      <CardSmall>
        <form action="">
          <h1 className="font-bold text-yellow-600 text-2xl">User Form</h1>
          <p className="text-gray-500 text-sm mb-4">Create new user</p>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">NIK</label>
            <input
              type="text"
              name="name"
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600 focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="Same as your national id card's id..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="User name..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="User @email..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="px-4 py-2 text-sm w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="User *password..."
            />
          </div>

          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="inline-block bg-yellow-500 text-black hover:bg-yellow-600 hover:text-white rounded-sm font-bold px-4 py-2">
              Save
            </button>
            <Link
              to="/admin/users"
              className="inline-block bg-gray-400 text-black hover:bg-gray-600 hover:text-white rounded-sm font-bold px-4 py-2 mr-4">
              Cancel
            </Link>
          </div>
        </form>
      </CardSmall>
    </Container>
  );
}
