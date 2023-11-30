import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import Write from "../img/write.png";

import { AuthContext } from "../context/authContext";
import Logo from "../img/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { currentUser, logout } = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleHomeClick = () => {
    setSelectedCategory(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"} onClick={handleHomeClick}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link
            className={`link ${selectedCategory === "art" ? "selected" : ""}`}
            to={"/?cat=art"}
            onClick={() => handleCategoryClick("art")}
          >
            <h6>ART</h6>
          </Link>{" "}
          |
          <Link
            className={`link ${
              selectedCategory === "science" ? "selected" : ""
            }`}
            to={"/?cat=science"}
            onClick={() => handleCategoryClick("science")}
          >
            <h6>SCIENCE</h6>
          </Link>{" "}
          |
          <Link
            className={`link ${
              selectedCategory === "technology" ? "selected" : ""
            }`}
            to={"/?cat=technology"}
            onClick={() => handleCategoryClick("technology")}
          >
            <h6>TECHNOLOGY</h6>
          </Link>{" "}
          |
          <Link
            className={`link ${
              selectedCategory === "cinema" ? "selected" : ""
            }`}
            to={"/?cat=cinema"}
            onClick={() => handleCategoryClick("cinema")}
          >
            <h6>CINEMA</h6>
          </Link>{" "}
          |
          <Link
            className={`link ${
              selectedCategory === "design" ? "selected" : ""
            }`}
            to={"/?cat=design"}
            onClick={() => handleCategoryClick("design")}
          >
            <h6>DESIGN</h6>
          </Link>{" "}
          |
          <Link
            className={`link ${selectedCategory === "food" ? "selected" : ""}`}
            to={"/?cat=food"}
            onClick={() => handleCategoryClick("food")}
          >
            <h6>FOOD</h6>
          </Link>
        </div>
        <div className="main">
          {currentUser ? (
            <span className="user">
              <HiUser className="icon" />
              Hello,
              {currentUser?.username}
            </span>
          ) : null}{" "}
          <div className="logout">
            {currentUser ? (
              <span onClick={handleLogout}>
                <CiLogout className="logout_icon" />
                Logout
              </span>
            ) : (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
        {currentUser && (
          <Link className="link" to={"/write"}>
            <span className="write" onClick={handleHomeClick}>
              Create Post
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
