import { Link, useLocation,Outlet } from "react-router-dom";

const Calender = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "Monday"; // Default to "Monday" if no day is specified

  return (
    <>
      <div role="tablist" className="tabs tabs-boxed flex flex-wrap md:grid ">
        <Link
          to="/calender/Monday"
          className={`tab ${activeTab === "Monday" ? "tab-active" : ""}`}
        >
          Monday
        </Link>
        <Link
          to="/calender/Tuesday"
          className={`tab ${activeTab === "Tuesday" ? "tab-active" : ""}`}
        >
          Tuesday
        </Link>
        <Link
          to="/calender/Wednesday"
          className={`tab ${activeTab === "Wednesday" ? "tab-active" : ""}`}
        >
          Wednesday
        </Link>
        <Link
          to="/calender/Thursday"
          className={`tab ${activeTab === "Thursday" ? "tab-active" : ""}`}
        >
          Thursday
        </Link>
        <Link
          to="/calender/Friday"
          className={`tab ${activeTab === "Friday" ? "tab-active" : ""}`}
        >
          Friday
        </Link>
      </div>

      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default Calender;
