import { useNavigate } from "react-router";
import Logo from "../src/assets/logo.png"; // Import your logo

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <nav className="shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <div
        className="flex items-center cursor-pointer px-10"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="Logo" className="h-10 w-10 mr-2 object-contain" />
        <h2 className="text-2xl font-bold text-blue-600">BlogNest</h2>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-4">
        {/* Home */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        {/* Create Post - only visible if logged in */}
        {user && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
            onClick={() => navigate("/create")}
          >
            Create Post
          </button>
        )}

        {/* User + Auth */}
        {user ? (
          <>
            <span className="ml-2 font-medium text-gray-700">{user.username}</span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition"
            onClick={() => navigate("/auth")}
          >
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

