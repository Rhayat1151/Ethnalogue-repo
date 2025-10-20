import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = ({ user, isAdmin, onLogout, currentView, setView, setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Public links - ADDED "Dictionary" HERE
  const navLinks = [
    { label: "Home", view: "home" },
    { label: "About Us", view: "about" },
    { label: "Language Explorer", view: "user" },
    { label: "Dictionary", view: "dictionary" }, // ADDED THIS LINE
    ...(isAdmin ? [{ label: "Admin Panel", view: "admin" }] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg backdrop-blur-md"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold cursor-pointer tracking-wide"
          onClick={() => setView("home")}
        >
          🌍 Language Explorer
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.button
              key={link.view}
              onClick={() => setView(link.view)}
              className={`relative px-4 py-2 rounded-lg transition-colors ${
                currentView === link.view
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.button>
          ))}

          {!user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)} // toggle popup
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all"
            >
              Login / Sign Up
            </motion.button>
          ) : (
            <>
              <span className="mx-2 px-3 py-1 bg-blue-400/80 rounded-full text-sm shadow">
                👋 {user.email.split("@")[0]}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all font-semibold shadow"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-blue-600/95 backdrop-blur-md shadow-lg"
          >
            <div className="flex flex-col space-y-3 p-4">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    setView(link.view);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    currentView === link.view
                      ? "bg-white text-blue-700 font-semibold"
                      : "hover:bg-blue-500"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {!user ? (
                <button
                  onClick={() => {
                    setShowLogin(true)
                    setMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all"
                >
                  Login / Sign Up
                </button>
              ) : (
                <>
                  <span className="px-4 py-2 bg-blue-500/80 rounded-lg text-sm">
                    👋 {user.email.split("@")[0]}
                  </span>
                  <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all font-semibold"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;