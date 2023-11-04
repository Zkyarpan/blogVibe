import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-content">
        <span>
          <b>Blog Vibes </b>
        </span>
        <p> &copy; {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
