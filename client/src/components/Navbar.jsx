import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/authContext";
import Logo from "../img/Logo.png";
import Write from "../img/write.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to={"/?cat=art"}>
            <h6>ART</h6>
          </Link>{" "}
          |
          <Link className="link" to={"/?cat=science"}>
            <h6>SCIENCE</h6>
          </Link>{" "}
          |
          <Link className="link" to={"/?cat=technology"}>
            <h6>TECHNOLOGY</h6>
          </Link>{" "}
          |
          <Link className="link" to={"/?cat=cinema"}>
            <h6>CINEMA</h6>
          </Link>{" "}
          |
          <Link className="link" to={"/?cat=design"}>
            <h6>DESIGN</h6>
          </Link>{" "}
          |
          <Link className="link" to={"/?cat=food"}>
            <h6>FOOD</h6>
          </Link>
        </div>

        <div className="main">
          {currentUser ? (
            <span className="user">
              <i className="fa-solid fa-user"></i>
              {currentUser?.username}
            </span>
          ) : null}{" "}
          {currentUser ? (
            <span className="logout" onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>

        {currentUser && (
          <Link className="link" to={"/write"}>
            <span className="write">
              <img src={Write} alt="" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
