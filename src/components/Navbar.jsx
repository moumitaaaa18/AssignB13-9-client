import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="bg-black text-white px-6 md:px-10 py-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <Link to="/">
          <h1 className="text-3xl font-bold text-red-500">
            Drive<span className="text-white">Fleet</span>
          </h1>
        </Link>

        <ul className="flex flex-wrap justify-center gap-6 font-medium">
          <li>
            <Link className="hover:text-red-400 duration-300" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link
              className="hover:text-red-400 duration-300"
              to="/available-cars"
            >
              Explore Cars
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link
                  className="hover:text-red-400 duration-300"
                  to="/add-car"
                >
                  Add Car
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-red-400 duration-300"
                  to="/my-cars"
                >
                  My Cars
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-red-400 duration-300"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="bg-gray-800 px-4 py-2 rounded-xl text-sm">
                {user.email}
              </span>

              <button
                onClick={logoutUser}
                className="bg-red-500 hover:bg-red-600 duration-300 px-5 py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="bg-red-500 hover:bg-red-600 duration-300 px-5 py-2 rounded-xl">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="border border-red-500 hover:bg-red-500 duration-300 px-5 py-2 rounded-xl">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;