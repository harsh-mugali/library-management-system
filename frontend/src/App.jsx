import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const role = localStorage.getItem("role");

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/user"
          element={role === "user" ? <UserDashboard /> : <Navigate to="/" />}
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;