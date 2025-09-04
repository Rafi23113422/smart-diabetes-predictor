import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 shadow-md">
      <div className="container mx-auto flex items-center justify-center h-16 px-4">
        <Link
          to="/"
          className="text-gray-100 text-2xl font-semibold tracking-wide hover:text-yellow-400 transition-colors duration-300"
        >
          KnowDiabeties
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
