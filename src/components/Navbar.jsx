import { FaSun, FaMoon } from "react-icons/fa";
import { useWebContext } from "../contexts/webContexts";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useWebContext();

  return (
    <nav className="flex justify-between items-center bg-slate-600 text-white px-6 py-4 shadow-md dark:bg-gray-800">
      {/* Left Nav Links */}
      <ul className="flex gap-6">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>

      {/* Right Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 mx-2 rounded-md shadow transition duration-300 w-[140px] hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <>
              <FaSun className="mr-2" /> Light Mode
            </>
          ) : (
            <>
              <FaMoon className="mr-2" /> Dark Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
