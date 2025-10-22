// import React from "react";
// import { motion } from "framer-motion";
// import Footer from "./Footer";

// const fallingItems = ["📘", "📖", "A", "B", "C", "Ω", "文", "ع", "क"]; // Books + multilingual letters

// const HomePage = ({ user, isAdmin, setView }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-transparent">
//       {/* Hero Section */}
//       <section
//         className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900 text-black overflow-hidden"
//         style={{
//           backgroundImage:
//             "url('')",
//           backgroundSize: "cover",
//           backgroundBlendMode: "overlay",
//         }}
//       >
//         {/* Falling Letters/Books */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {fallingItems.map((item, i) => (
//             <motion.span
//               key={i}
//               initial={{ y: -100, opacity: 0 }}
//               animate={{
//                 y: "100vh",
//                 opacity: [0, 1, 1, 0],
//                 x: Math.random() * window.innerWidth,
//               }}
//               transition={{
//                 duration: 6 + Math.random() * 4,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//               className="absolute text-2xl md:text-3xl opacity-70"
//               style={{ left: `${Math.random() * 100}%` }}
//             >
//               {item}
//             </motion.span>
//           ))}
//         </div>

//         {/* Hero Content */}
//         <motion.div
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="relative z-10 max-w-6xl px-4 text-center"
//         >
//           <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
//             Discover the World's
//             <span className="block text-blue-500">
//               Linguistic Diversity
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl mb-10 text-black max-w-3xl mx-auto leading-relaxed">
//             Explore thousands of languages, cultures, and dialects through our
//             interactive platform. Join a global community of language
//             enthusiasts and researchers.
//           </p>

//           {!user && (
//             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setView("user")}
//                 className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all"
//               >
//                 Start Your Journey
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setView("admin")}
//                 className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl"
//               >
//                 Admin Access
//               </motion.button>
//             </div>
//           )}

//           {user && (
//             <div className="mt-8">
//               <p className="text-lg mb-4">
//                 Welcome back,{" "}
//                 <span className="font-semibold">{user.email}</span>!
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setView(isAdmin ? "admin" : "user")}
//                 className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition-all"
//               >
//                 Continue to {isAdmin ? "Admin Panel" : "Dashboard"}
//               </motion.button>
//             </div>
//           )}
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-14">
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
//               Why Choose{" "}
//               <span className="text-blue-600">Language Explorer?</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Our platform offers comprehensive tools and resources for
//               language discovery, learning, and research.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
//             {[
//               {
//                 title: "Comprehensive Database",
//                 desc: "Access detailed information on over 7,000+ languages worldwide, including historical data, speaker statistics, and linguistic characteristics.",
//                 color: "bg-blue-600",
//               },
//               {
//                 title: "Interactive Maps",
//                 desc: "Visualize language distribution with our dynamic, interactive maps. Explore linguistic patterns and geographical influences.",
//                 color: "bg-emerald-500",
//               },
//               {
//                 title: "Personal Collections",
//                 desc: "Create and manage your personalized language collections. Save favorites, track progress, and share your discoveries.",
//                 color: "bg-purple-600",
//               },
//             ].map((card, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100"
//               >
//                 <div
//                   className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}
//                 >
//                   <span className="text-2xl text-white">📘</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//                   {card.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">{card.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-gray-100">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
//             {[
//               {
//                 value: "7,000+",
//                 label: "Languages Cataloged",
//                 color: "text-blue-600",
//               },
//               {
//                 value: "200+",
//                 label: "Countries Covered",
//                 color: "text-emerald-500",
//               },
//               {
//                 value: "50K+",
//                 label: "Active Users",
//                 color: "text-purple-600",
//               },
//               {
//                 value: "24/7",
//                 label: "Platform Availability",
//                 color: "text-red-500",
//               },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <div
//                   className={`text-4xl md:text-5xl font-extrabold ${stat.color} mb-2`}
//                 >
//                   {stat.value}
//                 </div>
//                 <div className="text-gray-700">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white relative overflow-hidden">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           whileInView={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="max-w-4xl mx-auto px-4 text-center"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
//             Ready to Explore Languages?
//           </h2>
//           <p className="text-xl mb-8 text-blue-100">
//             Join thousands of language enthusiasts and start your linguistic
//             journey today.
//           </p>
//           {!user && (
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setView("user")}
//               className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
//             >
//               Create Free Account
//             </motion.button>
//           )}
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;


import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const HomePage = ({ user, isAdmin, setView }) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900 text-black overflow-hidden"
        style={{
          backgroundImage:
            "url('')",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Hero Content */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 max-w-6xl px-4 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Discover the World's
            <span className="block text-blue-500">
              Linguistic Diversity
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-black max-w-3xl mx-auto leading-relaxed">
            Explore thousands of languages, cultures, and dialects through our
            interactive platform. Join a global community of language
            enthusiasts and researchers.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("user")}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-all"
              >
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("admin")}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl"
              >
                Admin Access
              </motion.button>
            </div>
          )}

          {user && (
            <div className="mt-8">
              <p className="text-lg mb-4">
                Welcome back,{" "}
                <span className="font-semibold">{user.email}</span>!
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView(isAdmin ? "admin" : "user")}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition-all"
              >
                Continue to {isAdmin ? "Admin Panel" : "Dashboard"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              Why Choose{" "}
              <span className="text-blue-600">Language Explorer?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers comprehensive tools and resources for
              language discovery, learning, and research.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                title: "Comprehensive Database",
                desc: "Access detailed information on over 7,000+ languages worldwide, including historical data, speaker statistics, and linguistic characteristics.",
                color: "bg-blue-600",
              },
              {
                title: "Interactive Maps",
                desc: "Visualize language distribution with our dynamic, interactive maps. Explore linguistic patterns and geographical influences.",
                color: "bg-emerald-500",
              },
              {
                title: "Personal Collections",
                desc: "Create and manage your personalized language collections. Save favorites, track progress, and share your discoveries.",
                color: "bg-purple-600",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <div
                  className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}
                >
                  <span className="text-2xl text-white">📘</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              {
                value: "7,000+",
                label: "Languages Cataloged",
                color: "text-blue-600",
              },
              {
                value: "200+",
                label: "Countries Covered",
                color: "text-emerald-500",
              },
              {
                value: "50K+",
                label: "Active Users",
                color: "text-purple-600",
              },
              {
                value: "24/7",
                label: "Platform Availability",
                color: "text-red-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div
                  className={`text-4xl md:text-5xl font-extrabold ${stat.color} mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to Explore Languages?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of language enthusiasts and start your linguistic
            journey today.
          </p>
          {!user && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("user")}
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
            >
              Create Free Account
            </motion.button>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
