/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAlternateEmail, MdPerson } from "react-icons/md";

const EditAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState(null);
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
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/account");
    } catch (error) {
      setError(error.response.data.message || "Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-12 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="./src/assets/Logo.png" alt="SIMS PPOB Logo" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </div>
      </header>

      <main className="px-8 py-6">
        {formData && (
          <div className="flex flex-col items-center">
            <img
              src={formData.profile_image || "https://via.placeholder.com/100"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-6">{`${formData.first_name} ${formData.last_name}`}</h2>

            <div className="w-1/2 space-y-4">
              <div className="relative">
                <MdAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  disabled
                />
              </div>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  required
                />
              </div>
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-10 py-3 border rounded-lg focus:ring-2"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-1/2 bg-red-500 text-white py-3 rounded-lg mt-6"
            >
              Simpan
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </main>
    </div>
  );
};

export default EditAccount;
