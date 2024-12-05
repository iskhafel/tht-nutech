/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const Transaction = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch user data
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

  // Fetch balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle transaction
  const handleTransaction = async () => {
    if (!selectedService) {
      alert("Please select a service.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code: selectedService.service_code,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Transaction Successful:", response.data);
      fetchBalance(); // Refresh balance
      alert("Transaction successful!");
      setAmount("");
    } catch (error) {
      setError(error.response?.data?.message || "Transaction failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBalance();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <Link to="/transaction" className="text-red-500 hover:text-red-700">
            Transaction
          </Link>
          <Link to="/account" className="text-gray-700 hover:text-red-500">
            Akun
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="flex justify-between">
          {/* User Info */}
          {user && (
            <section className="flex flex-col space-x-4 mb-6 w-1/2">
              <img
                src={user.profile_image || "https://via.placeholder.com/50"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full ml-4"
              />
              <div className="pt-4">
                <h2 className="text-gray-600 text-xl">Selamat datang,</h2>
                <p className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</p>
              </div>
            </section>
          )}

          {/* Balance Section */}
          {balance && (
            <section className="bg-red-500 text-white rounded-lg p-6 mb-6 w-1/2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Saldo anda</h3>
                  <p className="text-2xl font-bold py-3">
                    {balanceVisible ? `Rp ${balance.balance}` : "Rp ••••••"}
                  </p>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="text-white text-lg font-bold flex items-center space-x-2 hover:underline"
                  >
                    {balanceVisible ? (
                      <>
                        <FiEyeOff className="mr-2" /> Tutup Saldo
                      </>
                    ) : (
                      <>
                        <FiEye className="mr-2" /> Lihat Saldo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Transaction Section */}
        <section className="mt-8 px-4 py-6">
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold mb-2 text-gray-600">Pembayaran</p>
            <h2 className="text-2xl font-bold mb-6">Pilih layanan</h2>
          </div>

          {/* Service Selection */}
          <select
            className="w-full px-4 py-3 border rounded-lg mb-6 focus:ring-2 focus:ring-red-500 outline-none"
            value={selectedService?.service_code || ""}
            onChange={(e) =>
              setSelectedService(
                services.find(
                  (service) => service.service_code === e.target.value
                )
              )
            }
          >
            <option value="" disabled>
              Pilih layanan
            </option>
            {services.map((service) => (
              <option key={service.service_code} value={service.service_code}>
                {service.service_name}
              </option>
            ))}
          </select>

          {/* Amount Input */}
          <div className="flex flex-col mb-6 space-y-4">
            <input
              type="number"
              placeholder="Masukan nominal pembayaran"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button
              onClick={handleTransaction}
              className={`px-6 py-3 rounded-lg text-white font-bold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Bayar"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>

        <section className="mt-10">
          <Link
            to="/transaction/history"
            className="text-center bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600"
          >
            Lihat Semua Transaksi
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Transaction;
