import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    let usr = localStorage.getItem("userData");
    if (usr) {
      setUser(JSON.parse(usr));
    }
  }, []);

  const logOutClick = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-purple fixed-top">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/app/home" className="nav-link">
                Home
              </Link>
            </li>       
            <li className="nav-item">
              <Link to="/app/punch" className="nav-link">
                Punch
              </Link>
            </li>  
            <li className="nav-item">
              <Link to="/app/status" className="nav-link">
              Status
              </Link>
            </li>  
            <li className="nav-item">
              <Link to="/app/leave" className="nav-link">
              Leave
              </Link>
            </li>  
            {/* <li className="nav-item">
              <Link to="/app/calendar" className="nav-link">
              Calendar
              </Link>
            </li> */}
          </ul>
        </div>
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn btn-outline-success my-2 my-sm-0 m-1"
            >
              Login
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            onClick={logOutClick}
            className="btn btn-outline-success my-2 my-sm-0 m-1"
          >
            LogOut
          </Link>
        )}
      </nav>
      <div style={{ paddingTop: "55px" }}></div>
    </div>
  );
}

export default Navbar;
