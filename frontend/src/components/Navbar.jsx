import {NavLink} from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <div className="navbar bg-base-100 align-element">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">User</NavLink>
              </li>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/calender">Timetable</NavLink>
              </li>
              <li>
                <NavLink to="/importXML">XML Import</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blogs</NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">High Street Gym</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li>
                <NavLink to="/">User</NavLink>
              </li>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/calender">Timetable</NavLink>
              </li>
              <li>
                <NavLink to="/importXML">XML Import</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blogs</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
