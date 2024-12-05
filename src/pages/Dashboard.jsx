import axios from "axios";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [banner, setBanner] = useState(null);
  const [service, setService] = useState(null);
  const [balance, setBalance] = useState(null);

  const [balanceVisible, setBalanceVisible] = useState(false);

  const token = localStorage.getItem("authToken");

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
      console.error(error.message);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/banner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBanner(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

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
      setService(response.data.data);
    } catch (error) {
      console.error(error.message);
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
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBanner();
    fetchServices();
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="./src/assets/Logo.png" alt="" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </div>
        <nav className="flex space-x-6 font-bold">
          <a href="/top-up" className="text-gray-700 hover:text-red-500">
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
        {/* User Info */}
        <div className="flex justify-between">
          {user && (
            <section className="flex flex-col space-x-4 mb-6 w-1/2">
              <img
                src={user.profile_image || "https://via.placeholder.com/50"}
                alt=""
                className="w-12 h-12 rounded-full ml-4"
              />
              <div className="pt-4">
                <h2 className="text-gray-600 text-xl ">Selamat datang,</h2>
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

        {/* Services Section */}
        {service && (
          <section className="my-6">
            <div className="flex flex-row gap-4 bg-white rounded-lg">
              {service.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center p-4 rounded-lg cursor-pointer w-auto h-auto"
                >
                  <img
                    src={item.service_icon || "https://via.placeholder.com/40"}
                    alt={item.service_code}
                    className="w-16 h-16 mb-2"
                  />
                  <p className="text-sm font-medium">{item.service_name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Banner Section */}
        {banner && (
          <section>
            <h3 className="text-xl font-bold mb-4">Temukan promo menarik</h3>
            <div className="grid grid-cols-4 gap-4">
              {banner.map((item) => (
                <div
                  key={item.id}
                  className="relative h-36 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={item.banner_image || "https://via.placeholder.com/300"}
                    alt={item.banner_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
