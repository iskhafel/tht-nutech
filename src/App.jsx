/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./pages/auth/authSlice";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TopUp from "./pages/topup/TopUp";
import Transaction from "./pages/transaction/Transaction";
import TransactionHistory from "./pages/transaction/TransactionHistory";
import Account from "./pages/account/Account";
import EditAccount from "./pages/account/EditAccount";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Sync Redux state with token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login.fulfilled(token)); // Sync Redux state with token
    }
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const AuthRedirectRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to /dashboard if authenticated */}
        <Route
          path="/"
          element={
            <AuthRedirectRoute>
              <Login />
            </AuthRedirectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirectRoute>
              <Register />
            </AuthRedirectRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/top-up"
          element={
            <ProtectedRoute>
              <TopUp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction/history"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/edit"
          element={
            <ProtectedRoute>
              <EditAccount />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
