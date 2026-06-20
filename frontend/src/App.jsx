import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AddTaskPage from "./pages/AddTaskPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [page, setPage] =
    useState("dashboard");

  const [darkMode, setDarkMode] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn") ===
        "true"
    );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  if (!isLoggedIn) {
    return showRegister ? (
      <RegisterPage
        setShowRegister={
          setShowRegister
        }
      />
    ) : (
      <LoginPage
        setIsLoggedIn={
          setIsLoggedIn
        }
        setRole={setRole}
        setShowRegister={
          setShowRegister
        }
      />
    );
  }

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-white text-black"
      }
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
        role={role}
      />

      {page === "dashboard" ? (
        <DashboardPage />
      ) : (
        <AddTaskPage />
      )}
    </div>
  );
}

export default App;