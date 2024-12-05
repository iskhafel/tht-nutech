/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAlternateEmail, MdPerson } from "react-icons/md";

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-12 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="./src/assets/Logo.png" alt="SIMS PPOB Logo" />
          <Link to="/" className="text-xl font-bold">
            SIMS PPOB
          </Link>
        </div>
        <nav className="flex space-x-6 font-bold">
          <Link to="/top-up" className="text-gray-700 hover:text-red-500">
            Top Up
          </Link>
          <Link to="/transactions" className="text-gray-700 hover:text-red-500">
            Transaction
          </Link>
          <Link to="/account" className="text-red-500 hover:text-red-700">
            Akun
          </Link>
        </nav>
      </header>

      <main className="px-8 py-6">
        {user && (
          <div className="flex flex-col items-center">
            <img
              src={user.profile_image || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-6">{`${user.first_name} ${user.last_name}`}</h2>

            <div className="w-1/2 space-y-4">
              <div className="relative">
                <MdAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  disabled
                />
              </div>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={user.first_name}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  disabled
                />
              </div>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={user.last_name}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  disabled
                />
              </div>
            </div>

            <div className="w-1/2 mt-6 space-y-4">
              <Link
                to="/account/edit"
                className="w-full bg-red-500 text-white py-3 rounded-lg text-center block"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Account;
