import React, { useState, useEffect } from "react";
import { CardSmall } from "./Card";
import { Link, useHistory } from "react-router-dom";
import Loader from "./Loader";
import { normalDate } from "../utils/time";
import { ChooseOne } from "./ChooseOne";
import { getUsers, postUser, patchUser } from "../apis/users";
import { postProfile } from "../apis/profiles";

export default function UserProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [user, setUser] = useState({
    nik: "",
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [profile, setProfile] = useState({
    bio: "",
    gender: "",
    birthPlace: "",
    birthDate: "",
    contact: "",
    religion: "",
    maritalStatus: "",
    nationality: "",
    address: "",
    skills: "",
  });

  const changeUser = (ev) =>
    setUser({ ...user, [ev.target.name]: ev.target.value });

  const changeProfile = (ev) =>
    setProfile({ ...profile, [ev.target.name]: ev.target.value });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    console.log("user", user);
    console.log("profile", profile);
    if (user._id) {
      await patchUser(user, {
        endpoint: "me",
      });
    } else {
      await postUser(user, {
        enpoint: "me",
      });
    }

    if (await postProfile(profile)) {
      alert("Berhasil mengupdate profil pengguna !!");
      history.push("/user/profile");
    } else {
      alert("Gagal mengupdate profil pengguna !!");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers("user", {
      endpoint: "me",
    })
      .then((data) => {
        if (data) {
          setUser({
            _id: data._id,
            nik: data.nik,
            name: data.name,
            email: data.email,
            password: "",
          });
        }

        if (data.profile) {
          setProfile({
            _id: data.profile._id,
            bio: data.profile.bio,
            gender: data.profile.gender,
            birthPlace: data.profile.birthPlace,
            birthDate: normalDate(data.profile.birthDate),
            contact: data.profile.contact,
            religion: data.profile.religion,
            maritalStatus: data.profile.maritalStatus,
            nationality: data.profile.nationality,
            address: data.profile.address,
            skills: data.profile.skills.join(", "),
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  if (isLoading) return <Loader />;

  return (
    <CardSmall>
      <form onSubmit={submitHandler}>
        <h1 className="font-bold text-yellow-600 text-2xl">Update Profile</h1>
        <p className="text-gray-500 text-sm mb-4">Update Profile Kamu</p>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            NIK
          </label>
          <input
            type="text"
            name="nik"
            value={user.nik}
            onChange={changeUser}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Isi sesuai ktp anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Nama
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={changeUser}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Isi sesuai ktp anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="password"
            value={user.email}
            onChange={changeUser}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Email aktif anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={changeUser}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Isi sesuai ktp anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Foto Profile
          </label>
          <input
            type="file"
            name="image"
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Deskripsikan tentang diri anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Jenis Kelamin
          </label>
          <ChooseOne
            name="gender"
            value={profile.gender}
            onChange={changeProfile}
            choices={[
              {
                value: "Laki-Laki",
                className: "bg-gray-200 text-black",
                activeClassName: "bg-blue-500 text-white",
                label: "Laki-Laki",
              },
              {
                value: "Perempuan",
                className: "bg-gray-200 text-black",
                activeClassName: "bg-red-400 text-white",
                label: "Perempuan",
              },
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Tempat, Tanggal Lahir
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="birthPlace"
              value={profile.birthPlace}
              onChange={changeProfile}
              className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
              placeholder="Tempat lahir anda..."
            />
            <input
              type="date"
              name="birthDate"
              value={profile.birthDate}
              onChange={changeProfile}
              className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            No Kontak
          </label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="No telpon / HP anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Agama
          </label>
          <select
            name="religion"
            value={profile.religion}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600 focus:shadow-inner hover:border-yellow-700">
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Katholik">Katholik</option>
            <option value="Protestan">Protestan</option>
            <option value="Budha">Budha</option>
            <option value="Hindu">Hindu</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Status Perkawinan
          </label>
          <ChooseOne
            name="maritalStatus"
            value={profile.maritalStatus}
            onChange={changeProfile}
            choices={[
              {
                value: "Lajang",
                className: "bg-gray-200 text-black",
                activeClassName: "bg-green-500 text-white",
                label: "Lajang",
              },
              {
                value: "Menikah",
                className: "bg-gray-200 text-black",
                activeClassName: "bg-blue-500 text-white",
                label: "Menikah",
              },
              {
                value: "Cerai",
                className: "bg-gray-200 text-black",
                activeClassName: "bg-yellow-400 text-black",
                label: "Cerai",
              },
            ]}
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Kewarganegaraan
          </label>
          <input
            type="text"
            name="nationality"
            value={profile.nationality}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Isi sesuai ktp anda..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Alamat
          </label>
          <textarea
            name="address"
            value={profile.address}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Isi sesuai ktp anda..."
          />
        </div>

        <div className="mb-8">
          <label className="block font-bold text-sm text-gray-700 mb-2">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={changeProfile}
            className="px-4 py-2 text-sm text-gray-700 w-full rounded border border-gray-500 outline-none focus:border-yellow-600  focus:bg-gray-100 focus:shadow-inner hover:border-yellow-700"
            placeholder="Keahlian anda dipisahkan dengan koma (,), ex: skill 1, skill 2, skill 3, ..."
          />
        </div>

        <div className="flex flex-row-reverse">
          <button
            type="submit"
            className="inline-block bg-yellow-500 text-black hover:bg-yellow-700 rounded-sm font-semibold px-4 py-2">
            Save
          </button>
          <Link
            to="/admin/users"
            className="inline-block bg-yellow-800 text-white hover:bg-yellow-900 rounded-sm font-semibold px-4 py-2 mr-4">
            Cancel
          </Link>
        </div>
      </form>
    </CardSmall>
  );
}
