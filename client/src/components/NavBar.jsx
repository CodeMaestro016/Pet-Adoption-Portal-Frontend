import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [localStorage.getItem("token")]); // Re-run when token changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          🐾 Pet Adoption Portal
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-orange-100 transition-colors font-medium"
              >
                Dashboard
              </Link>

              {user.role === "Shelter" && (
                <>
                  <Link
                    to="/view-pets"
                    className="hover:text-orange-100 transition-colors font-medium"
                  >
                    View Pets
                  </Link>
                  <Link
                    to="/add-pet"
                    className="hover:text-orange-100 transition-colors font-medium"
                  >
                    Add Pet
                  </Link>
                </>
              )}

              {user.role === "Adopter" && (
                <Link
                  to="/pet-listings"
                  className="hover:text-orange-100 transition-colors font-medium"
                >
                  Pet Listings
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="ml-4 bg-white text-orange-600 px-4 py-2 rounded-lg shadow hover:bg-orange-50 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-orange-100 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow hover:bg-orange-50 font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
