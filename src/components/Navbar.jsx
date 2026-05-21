import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-black text-white">
      <Link to="/">
        <h1 className="text-3xl font-bold text-red-500">
          DriveFleet
        </h1>
      </Link>

      <ul className="flex gap-6 font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/available-cars">
            Available Cars
          </Link>
        </li>

        <li>
          <Link to="/add-car">Add Car</Link>
        </li>

        <li>
          <Link to="/my-cars">My Cars</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;