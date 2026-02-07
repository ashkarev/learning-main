import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { Dropdown } from "flowbite-react";

const Navbar = () => {
  const { removeToken, token } = useContext(authContext)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onLoggedOut = () => {
    // localStorage.clear()
    removeToken()
    navigate('/')
  }

 return (
  <>
    <nav className="fixed top-0 left-0 w-full z-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="h-10 rounded-xl" alt="Blink Tutors" />
          <span className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
            Blink Tutors
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg md:hidden text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 17 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul
            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 
            mt-4 md:mt-0 p-4 md:p-0 
            bg-white border border-gray-100 rounded-xl md:border-0"
          >
            {["Home", "About", "Careers", "Courses", "Contact"].map((item, i) => (
              <li key={i}>
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase()}`
                  }
                  className="block px-3 py-2 text-gray-700 font-medium rounded-lg
                  hover:text-blue-600 hover:bg-blue-50
                  md:hover:bg-transparent transition"
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Auth */}
            <li>
              {token ? (
                <Dropdown
  inline
  placement="bottom-end"
  className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden"
  label={
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
      <img
        className="w-6 h-6 rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
        alt="profile"
      />
    </div>
  }
>
  <Link
    to="/studentProfile"
    className="block px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 hover:text-blue-600 transition"
  >
    Profile
  </Link>

  <button
    onClick={onLoggedOut}
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100 hover:text-red-600 transition"
  >
    Logout
  </button>
</Dropdown>

              ) : (
                <Link to="/login">
                  <button className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);

};

export default Navbar;
