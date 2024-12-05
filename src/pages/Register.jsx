/* eslint-disable no-unused-vars */
import { useState } from "react";
import { registerUser } from "../services/api";
import Image from "../assets/Illustrasi Login.png";
import Logo from "../assets/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdAlternateEmail, MdPerson, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setSuccessMessage(null);

    const { confirm_password: _, ...payload } = formData;

    registerUser(payload)
      .then((response) => {
        setSuccessMessage(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })

      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center space-y-6 w-1/2">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="SIMS PPOB Logo" className="h-12" />
            <h1 className="text-2xl font-bold">SIMS PPOB</h1>
          </div>

          <h1 className="text-center text-2xl font-bold py-4">
            Lengkapi data untuk <br /> membuat akun
          </h1>

          <form onSubmit={handleSubmit} className="w-full">
            {error && (
              <p className="text-red-500 text-lg font-bold mb-3">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-lg font-bold mb-3">
                {successMessage}
              </p>
            )}

            <div className="relative w-full my-3">
              <MdAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Masukan email anda"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2"
                required
              />
            </div>

            <div className="relative w-full my-3">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="first_name"
                placeholder="Nama depan"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2"
                required
              />
            </div>

            <div className="relative w-full my-3">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="last_name"
                placeholder="Nama belakang"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2"
                required
              />
            </div>

            <div className="relative w-full my-3">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Buat password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full my-3 mb-10">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirm_password"
                placeholder="Konfirmasi password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Registrasi
            </button>
          </form>

          <p className="text-center mt-4">
            Sudah punya akun? Login{" "}
            <Link to="/login" className="text-red-500 font-bold">
              di sini
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2">
        <img
          src={Image}
          alt="Illustration"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Register;
