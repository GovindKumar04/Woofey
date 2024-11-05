import React from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
      
      <footer className="flex bg-orange-100 text-gray-800 py-10 items-baseline align-bottom">
        <div className="container mx-auto px-4">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-2 ">
              <img
                src={assets.logo}
                alt="Woofey Logo"
                className="max-w-60 max-h-10 rounded "
              />
            </div>
            <nav className="mt-4 sm:mt-0 space-x-4">
              <a href="/about" className="hover:text-orange-600">
                About Us
              </a>
              <a href="/services" className="hover:text-orange-600">
                Services
              </a>
              <a href="/contact" className="hover:text-orange-600">
                Contact
              </a>
              <a href="/blog" className="hover:text-orange-600">
                Blog
              </a>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Woofey. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="https://www.facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    
  );
}

export default Footer;
