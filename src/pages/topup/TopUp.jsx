/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const TopUp = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const predefinedAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

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
      console.error("Error fetching user:", error);
    }
  };

  const handleTopUp = async () => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          top_up_amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setAmount(0);
      setError(null);
      fetchBalance(); // Refresh balance after successful top-up
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBalance();
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
          <Link to="/transaction" className="text-gray-700 hover:text-red-500">
            Transaction
          </Link>
          <Link to="/account" className="text-gray-700 hover:text-red-500">
            Akun
          </Link>
        </nav>
      </header>

      <main className="px-8 py-6">
        <div className="flex justify-between">
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
                        <FiEyeOff className="mr-2" /> Sembunyikan Saldo
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

        {/* Top-Up Section */}
        <section className="mt-8 px-4 py-6">
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold mb-2 text-gray-600">
              Silahkan masukan
            </p>
            <h2 className="text-2xl font-bold mb-10">Nominal Top Up</h2>
          </div>

          <div className="w-full flex flex-row gap-6">
            <div className="flex flex-col mb-6 w-2/3 space-y-4">
              <input
                type="number"
                placeholder="Masukan nominal Top Up"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              <button
                onClick={handleTopUp}
                className={`px-6 py-3 rounded-lg text-white font-bold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-400 hover:bg-red-600"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Top Up"}
              </button>
            </div>

            {/* Predefined Amount Buttons */}
            <div className="grid grid-cols-3 gap-4 w-1/3">
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className="border rounded-lg py-2 px-4 text-center hover:bg-gray-100 focus:bg-gray-200"
                >
                  Rp{value.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopUp;
