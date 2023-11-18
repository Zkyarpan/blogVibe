import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-content">
        <p>
          {" "}
          &copy; {currentYear}{" "}
          <span>
            <b>Blog Vibes.</b>
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
