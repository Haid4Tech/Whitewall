"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            SIL<span className="text-gray-600">ENT</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <a
              href="#gallery"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#layout"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              House layout
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              How to get
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>EN</span>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </a>
              <a
                href="#gallery"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Gallery
              </a>
              <a
                href="#layout"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                House layout
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                How to get
              </a>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full mt-4">
                Contact Us
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
