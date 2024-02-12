import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer__section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>About Us</h4>
            <a href="/home">
              <p>Home</p>
            </a>
            <a href="/feedback">
              <p>Feedback</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Services</h4>
            <a href="/lost">
              <p>Report Lost Item</p>
            </a>
            <a href="/found">
              <p>Report Found Item</p>
            </a>
            <a href="/items">
              <p>See Items Gallery</p>
            </a>
            <a href="/helpusfind">
              <p>Help Us Find</p>
            </a>
          </div>
        </div>
        <hr></hr>


      </div>
    </div>
  );
};

export default Footer;
