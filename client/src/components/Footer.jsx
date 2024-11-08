import React from "react";
import './css/Footer.css'
import logo from '../assets/logo.png';
import IndianFlag from '../assets/IndianFlag.png'
import playStore from '../assets/playStore.png'
import appleStore from '../assets/appleStore.png'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="footer_section1">
        <img src={logo} alt="zomato logo" className="mb-3" />
        <div className="section1__button_container">
          <button>
            {/* <img
              src={IndianFlag}
              alt="Indian Flag"
              style={{ width: 16, height: 16 }}
            /> */}
            <select
              style={{ border: "none", background: "#e8e8e8", cursor: "pointer" }}
            >
              <option>India</option>
              <option>United States</option>
              <option>Australia</option>
              <option>New Zealand</option>
              <option>Spain</option>
              <option>England</option>
            </select>
          </button>
          <button>
            <i className="fa fa-globe" />
            <select
              style={{ border: "none", background: "#e8e8e8", cursor: "pointer" }}
            >
              <option>English</option>
              <option>Español</option>
              <option>Čeština</option>
              <option>Slovenčina</option>
              <option>Polish</option>
              <option>Italian</option>
            </select>
          </button>
        </div>
      </div>
      <div className="navigation_container">
        <div className="link_container">
          <h5>About Zomato</h5>
          <div className="link_container_anchors">
            <a href="#">Who We Are</a>
            <a href="#">Blog</a>
            <a href="#">Work With Us</a>
            <a href="#">Investor Relations</a>
            <a href="#">Report Fraud</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="link_container">
          <h5>Zomaverse</h5>
          <div className="link_container_anchors">
            <a href="#">Zomato</a>
            <a href="#">Blinkit</a>
            <a href="#">Feeding India</a>
            <a href="#">Hyperpure</a>
            <a href="#">Zomaland</a>
          </div>
        </div>
        <div className="link_container">
          <h5>For Restaurants</h5>
          <div className="link_container_anchors">
            <a href="#">Partner With Us</a>
            <a href="#">Apps For You</a>
          </div>
          <h5 id="enterprises">For Enterprises</h5>
          <div className="link_container_anchors">
            <a href="#">Zomato For Work</a>
          </div>
        </div>
        <div className="link_container">
          <h5>Learn More</h5>
          <div className="link_container_anchors">
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
        <div className="link_container">
          <h5>Social Links</h5>
          <div className="social_media_icon_buttons">
            <div className="flex gap-[4px]">
              <button className="flex justify-center items-center">
                <FaFacebook />
              </button>
              <button className="flex justify-center items-center">
                <FaSquareInstagram />
              </button>
              <button className="flex justify-center items-center">
                <FaTwitterSquare/>
              </button>
              <button className="flex justify-center items-center">
                <FaYoutube/>
              </button>
              <button className="flex justify-center items-center">
                <FaLinkedin/>
              </button>
            </div>
            <div className="social_media_logos">
              <img src={playStore} alt="Apple store" />
              <img src={appleStore} alt="Play store" id="img2" />
            </div>
          </div>
        </div>
      </div>
      <div className="disclaimer">
        By continuing past this page, you agree to our Terms of Service, Cookie
        Policy, Privacy Policy and Content Policies. All trademarks are properties
        of their respective owners. 2008-2023 © Zomato™ Ltd. All rights reserved.
      </div>
    </footer>

  );
};

export default Footer;