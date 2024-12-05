/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import Image1 from "../../assets/Logo.png";

const TransactionHistory = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(3); // Default limit per page
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

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data.data.records);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.response?.data?.message || "Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBalance();
    fetchTransactionHistory();
  }, [offset]); // Refetch transactions when offset changes

  const handleShowMore = () => {
    setOffset(offset + limit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src={Image1} alt="SIMS PPOB Logo" />
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
          <Link to="/account" className="text-red-500 hover:text-red-700">
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

        {/* Transaction History Section */}
        <section className="mt-8 px-4 py-6">
          <h3 className="text-xl font-bold mb-4">Semua Transaksi</h3>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li
                key={transaction.description}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
              >
                <div>
                  <p
                    className={`text-lg font-bold ${
                      transaction.transaction_type === "TOPUP"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.transaction_type === "TOPUP"
                      ? `+ Rp${transaction.total_amount.toLocaleString()}`
                      : `- Rp${transaction.total_amount.toLocaleString()}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.created_on).toLocaleString("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <p className="text-gray-500">{transaction.description}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleShowMore}
            className="mt-6 text-red-500 hover:text-red-700 font-bold"
          >
            Show more
          </button>
        </section>
      </main>
    </div>
  );
};

export default TransactionHistory;
