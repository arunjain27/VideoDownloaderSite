import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>VideoDownloader</h3>
            <p>Download videos from multiple platforms quickly and easily. Free, fast, and secure.</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Platforms</h4>
            <ul>
              <li><Link to="/youtube-downloader">YouTube</Link></li>
              <li><Link to="/tiktok-downloader">TikTok</Link></li>
              <li><Link to="/instagram-downloader">Instagram</Link></li>
              <li><Link to="/facebook-downloader">Facebook</Link></li>
              <li><Link to="/twitter-downloader">Twitter</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="mailto:support@videodownloader.com">Email Support</a></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} VideoDownloader. All rights reserved.</p>
          <p className="footer-note">
            This service is for personal use only. Please respect copyright laws and platform terms of service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
