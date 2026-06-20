import React, { useState } from "react";

const RegisterPage = ({ setShowRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Registration Successful!");

    setShowRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-6">
          User Registration
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-4 rounded-xl mb-4"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            Register
          </button>

        </form>

        <button
          onClick={() =>
            setShowRegister(false)
          }
          className="mt-4 text-blue-600 font-bold"
        >
          Back To Login
        </button>

      </div>

    </div>
  );
};

export default RegisterPage;