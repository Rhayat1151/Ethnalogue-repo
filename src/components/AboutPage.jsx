import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Hero Section - 3D Book Style */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800">
        {/* Background Layer */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1350&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px) brightness(0.5)",
          }}
        ></motion.div>

        {/* Floating Book Pages */}
        {[...Array(5)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-32 h-44 bg-white rounded-md shadow-lg opacity-20"
            animate={{
              rotateY: [0, 15, -15, 0],
              rotateX: [0, 5, -5, 0],
              y: [0, -10, 10, 0],
              x: [0, 10, -10, 0],
            }}
            transition={{ duration: 6 + idx, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: `${10 + idx * 10}%`, left: `${20 + idx * 10}%` }}
          ></motion.div>
        ))}

        {/* Foreground Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
            Explore <span className="text-blue-300 animate-pulse">Languages</span> of the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed drop-shadow-md mb-8">
            Dive into the beauty of human languages. Discover, learn, and preserve linguistic diversity across the globe.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -1 }}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-2xl text-lg transition-all"
          >
            Start Exploring
          </motion.button>
        </motion.div>

        {/* Subtle Grid Overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
              alt="Language Exploration"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Language Explorer began as a small initiative by linguists, technologists, and cultural enthusiasts determined to preserve the beauty of human languages. What started as a digital archive quickly transformed into an interactive global platform connecting communities, scholars, and learners worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we are proud to host a comprehensive database, interactive maps, and innovative tools that empower individuals to explore, learn, and contribute to the global linguistic heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-100 leading-relaxed">
              To make linguistic knowledge accessible, interactive, and meaningful for everyone — from researchers to language lovers.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-blue-100 leading-relaxed">
              A world where every language is valued, preserved, and celebrated, fostering cultural understanding and global connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Our Journey</h2>
          <div className="space-y-12 relative border-l-4 border-blue-600 ml-6">
            {[
              { year: "2018", event: "The idea of Language Explorer was born with a small archive of 50 languages." },
              { year: "2020", event: "We launched interactive maps, reaching over 10,000 users worldwide." },
              { year: "2022", event: "Our platform expanded to 7,000+ documented languages and partnered with universities." },
              { year: "2024", event: "Community-driven features enabled users to contribute and preserve endangered languages." },
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="pl-6 relative"
              >
                <div className="absolute -left-6 top-1 w-4 h-4 bg-blue-600 rounded-full"></div>
                <h4 className="text-xl font-semibold text-gray-800">{milestone.year}</h4>
                <p className="text-gray-600">{milestone.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-14">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: "Dr. Sarah Johnson", role: "Chief Linguist", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Michael Chen", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/46.jpg" },
              { name: "Amina Hassan", role: "Cultural Researcher", img: "https://randomuser.me/api/portraits/women/68.jpg" },
            ].map((member, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-gray-50 rounded-2xl shadow-lg p-6">
                <img src={member.img} alt={member.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md" />
                <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 to-blue-700 text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Join Us in Preserving Languages</h2>
          <p className="text-xl mb-8 text-blue-100">Be part of a global movement to celebrate, document, and share the world’s linguistic heritage.</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all"
          >
            Get Involved
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default AboutPage;
