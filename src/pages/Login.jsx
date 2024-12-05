import { useState } from "react";
import { loginUser } from "../services/api";
import Image from "../assets/Illustrasi Login.png";
import Logo from "../assets/Logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    loginUser(formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        setSuccessMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message || "Invalid login credentials.");
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
            Masuk atau buat akun <br />
            untuk memulai
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

            <div className="relative w-full my-3 mb-10">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Masukan password"
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

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Belum punya akun? Daftar{" "}
            <Link to="/register" className="text-red-500 font-bold">
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

export default Login;
