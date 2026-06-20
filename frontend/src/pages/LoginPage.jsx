import React, { useState } from "react";

const LoginPage = ({ setIsLoggedIn, setRole, setShowRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ADMIN LOGIN
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");

      setRole("admin");
      setIsLoggedIn(true);

      return;
    }

    // USER LOGIN
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      savedUser &&
      username === savedUser.username &&
      password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");

      setRole("user");
      setIsLoggedIn(true);

      return;
    }

    alert("Invalid Username or Password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-purple-700 to-pink-500 flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold text-white mb-3">
        🚀 PROJECT
      </h1>

      <h1 className="text-6xl font-bold text-yellow-300 mb-8">
        MANAGEMENT PORTAL
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px]">

        <h2 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-4 rounded-xl mb-4"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-5"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-4 rounded-xl font-bold"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-500">
            New User?
          </p>

          <button
            onClick={() => setShowRegister(true)}
            className="mt-2 text-blue-600 font-bold"
          >
            Register Here
          </button>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;