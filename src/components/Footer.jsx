import React from "react";

const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-lg text-black mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Language Explorer
            </h3>
            <p className="text-black leading-relaxed mb-6">
              Discover the world's linguistic diversity through our comprehensive platform. 
              Explore languages, cultures, and connect with global communities.
            </p>
            <div className="flex space-x-5">
              {[
                {
                  name: "Facebook",
                  href: "#",
                  svg: (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 
                    5.373-12 12c0 5.99 4.388 10.954 
                    10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 
                    1.792-4.669 4.533-4.669 1.312 0 2.686.235 
                    2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 
                    1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 
                    23.027 24 18.062 24 12.073z" />
                  ),
                },
                {
                  name: "Twitter",
                  href: "#",
                  svg: (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 
                    4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 
                    1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 
                    4.067 6.13 1.64 3.162a4.822 4.822 0 
                    00-.666 2.475c0 1.71.87 3.213 
                    2.188 4.096a4.904 4.904 0 
                    01-2.228-.616v.06a4.923 4.923 0 
                    003.946 4.827 4.996 4.996 0 
                    01-2.212.085 4.936 4.936 0 
                    004.604 3.417 9.867 9.867 0 
                    01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 
                    13.995 0 007.557 2.209c9.053 0 13.998-7.496 
                    13.998-13.985 0-.21 0-.42-.015-.63A9.935 
                    9.935 0 0024 4.59z" />
                  ),
                },
                {
                  name: "GitHub",
                  href: "#",
                  svg: (
                    <path d="M12 2C6.477 2 2 6.484 2 
                    12.017c0 4.425 2.865 8.18 
                    6.839 9.504.5.092.682-.217.682-.483 
                    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 
                    1.003.07 1.531 1.032 1.531 
                    1.032.892 1.53 2.341 1.088 
                    2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 
                    0-1.093.39-1.988 
                    1.029-2.688-.103-.253-.446-1.272.098-2.65 
                    0 0 .84-.27 
                    2.75 1.026A9.564 9.564 0 
                    0112 6.844c.85.004 
                    1.705.115 
                    2.504.337 
                    1.909-1.296 
                    2.747-1.027 
                    2.747-1.027.546 1.379.202 
                    2.398.1 
                    2.651.64.7 
                    1.028 1.595 
                    1.028 2.688 
                    0 3.848-2.339 4.695-4.566 
                    4.943.359.309.678.92.678 
                    1.855 0 1.338-.012 
                    2.419-.012 2.747 
                    0 .268.18.58.688.482A10.019 
                    10.019 0 0022 
                    12.017C22 6.484 17.522 2 
                    12 2z" />
                  ),
                },
              ].map((icon) => (
                <a
                  key={icon.name}
                  href={icon.href}
                  className="text-black hover:text-blue-400 transition-colors duration-300"
                >
                  <span className="sr-only">{icon.name}</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {icon.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Language Database", "Interactive Maps", "Learning Resources"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-black hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">Contact Info</h4>
            <ul className="space-y-3 text-black">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 
                    002.22 0L21 8M5 19h14a2 2 
                    0 002-2V7a2 2 0 00-2-2H5a2 
                    2 0 00-2 2v10a2 2 0 002 
                    2z"
                  />
                </svg>
                info@languageexplorer.com
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 
                    0 01.948.684l1.498 
                    4.493a1 1 0 01-.502 
                    1.21l-2.257 1.13a11.042 
                    11.042 0 005.516 
                    5.516l1.13-2.257a1 1 
                    0 011.21-.502l4.493 
                    1.498a1 1 0 
                    01.684.949V19a2 2 0 
                    01-2 2h-1C9.716 21 
                    3 14.284 3 6V5z"
                  />
                </svg>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-black text-sm">
          <p>&copy; 2024 Language Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
