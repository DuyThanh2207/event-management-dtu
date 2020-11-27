import React from "react";
const Footer = () => {
  return (
    <div className="fixed-bottom d-flex justify-content-center mt-5 mb-2">
      <div className="app-footer">
        <div className="app-footer__inner">
          &copy;{new Date().getFullYear()} Copyright by C1SE.12 Team
        </div>
      </div>
    </div>
  );
};

export default Footer;
