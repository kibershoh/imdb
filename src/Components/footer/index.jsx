import React from "react";
import './styles.scss'
import { FaTiktok, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import qr from '../../assets/carousel/qr.webp'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-social">
          <h3>Follow IMDb on social</h3>
          <div className="footer-icons">
            <FaTiktok />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
            <FaFacebook />
          </div>
        </div>
        <div className="footer-app">
         <div className="footer-title">
         <h3>Get the IMDb app</h3>
         <p>For Android and iOS</p>
         </div>
          <div className="footer-qr">

            <img src={qr} width={80} height={80} alt="" />
          </div>
        </div>
      </div>
      <div className="footer-links">
        <a href="#">Help</a>
        <a href="#">Site Index</a>
        <a href="#">IMDbPro</a>
        <a href="#">Box Office Mojo</a>
        <a href="#">License IMDb Data</a>
        <a href="#">Press Room</a>
        <a href="#">Advertising</a>
        <a href="#">Jobs</a>
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Your Ads Privacy Choices</a>
      </div>
      <div className="footer-bottom">
        <p>an <span className="amazon">amazon</span> company</p>
        <p>© 1990-2025 by IMDb.com, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
