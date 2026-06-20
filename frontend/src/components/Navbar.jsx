const Navbar = ({
  darkMode,
  setDarkMode,
  setPage,
}) => {
  const role =
    localStorage.getItem("role") || "user";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg px-6 py-4 flex flex-col md:flex-row justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          🚀 Project Management Portal
        </h1>

        <p className="text-sm text-gray-300">
          Logged in as:
          <span className="ml-2 font-bold text-green-400 uppercase">
            {role}
          </span>
        </p>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">

        <button
          onClick={() => setPage("dashboard")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Dashboard
        </button>

        {role === "admin" && (
          <button
            onClick={() => setPage("add")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        )}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg"
        >
          {darkMode
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;