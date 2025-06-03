"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import DarkModeToggleButton from "./DarkModeToggleButton";

const navLinks = [
  { title: "Home", path: "#home", bgColor: "#6b46c1" },
  { title: "About", path: "#about", bgColor: "#7c3aed" },
  { title: "Projects", path: "#projects", bgColor: "#5b21b6" },
  { title: "Contact", path: "#contact", bgColor: "#4c1d95" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [bgColor, setBgColor] = useState("#6b46c1");

  // Smooth Scrolling Function
  const handleSmoothScroll = (e, targetId, color) => {
    e.preventDefault();
    setActiveSection(targetId);
    setBgColor(color);

    document
      .querySelector(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavbarOpen(false);
  };

  // Detect Active Section & Update Background (Desktop + Mobile)
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      navLinks.forEach((link) => {
        const section = document.querySelector(link.path);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            window.scrollY >= sectionTop - 100 &&
            window.scrollY < sectionTop + sectionHeight
          ) {
            setActiveSection(link.path);
            setBgColor(link.bgColor);
            found = true;
          }
        }
      });

      // Default Background when scrolling outside sections
      if (!found) {
        setBgColor("#6b46c1");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 w-full"
    >
      <div className="flex container flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href="/"
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          LOGO
        </Link>
        <DarkModeToggleButton />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="block md:hidden px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
        >
          {navbarOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  onClick={(e) =>
                    handleSmoothScroll(e, link.path, link.bgColor)
                  }
                  className={`text-white p-4 transition-all duration-500 ease-in-out relative ${
                    activeSection === link.path
                      ? "text-yellow-300 font-bold"
                      : ""
                  }`}
                >
                  {link.title}
                  <span
                    className={`absolute left-0 bottom-0 h-[3px] bg-yellow-300 transition-all duration-1000 ease-in-out ${
                      activeSection === link.path ? "w-full" : "w-0"
                    }`}
                  ></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {navbarOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-12 right-0 w-3/4 bg-gray-900 shadow-lg rounded-lg p-4"
        >
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  onClick={(e) =>
                    handleSmoothScroll(e, link.path, link.bgColor)
                  }
                  className={`block text-white text-xl py-2 px-4 rounded-lg transition-all duration-500 ease-in-out ${
                    activeSection === link.path
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
