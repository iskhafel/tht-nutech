import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topUpBalance } from "./balanceSlice"; // Redux slice for balance
import { FiEye, FiEyeOff } from "react-icons/fi";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector((state) => state.balance);

  const predefinedAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const handleTopUp = () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }
    dispatch(topUpBalance(Number(amount)));
    setAmount(""); // Clear the input field after submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="./src/assets/Logo.png" alt="" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </div>
        <nav className="flex space-x-6 font-bold">
          <a href="/top-up" className="text-red-500 hover:text-red-700">
            Top Up
          </a>
          <a href="/transactions" className="text-gray-700 hover:text-red-500">
            Transaction
          </a>
          <a href="/account" className="text-gray-700 hover:text-red-500">
            Akun
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        {/* Balance Section */}
        <section className="bg-red-500 text-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg">Saldo anda</h3>
              <p className="text-2xl font-bold">
                {balanceVisible ? `Rp ${balance}` : "Rp ••••••"}
              </p>
            </div>
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
        </section>

        {/* Top-Up Section */}
        <section>
          <h3 className="text-xl font-bold mb-4">Silahkan masukan</h3>
          <h2 className="text-2xl font-bold mb-6">Nominal Top Up</h2>
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              placeholder="Masukan nominal Top Up"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-1/3 px-4 py-3 border rounded-lg focus:ring-2"
            />
            <button
              onClick={handleTopUp}
              className={`px-6 py-3 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Top Up"}
            </button>
          </div>

          {/* Predefined Amounts */}
          <div className="grid grid-cols-3 gap-4">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className="border rounded-lg py-2 px-4 text-center hover:bg-gray-200"
              >
                Rp{value.toLocaleString()}
              </button>
            ))}
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>
      </main>
    </div>
  );
};

export default TopUp;
