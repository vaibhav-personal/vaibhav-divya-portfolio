"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Message sent successfully 🚀");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);

      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 mb-4">Contact Me</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Let’s Build Something Amazing
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            I'm always interested in discussing frontend engineering, MERN
            stack, AI-powered applications, and exciting opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{
              once: true,
            }}
            className="space-y-8"
          >
            {/* EMAIL */}
            <a
              href="mailto:vaibhav.divya2202@gmail.com"
              className="block bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-400/10 p-4 rounded-2xl text-cyan-400">
                  <FaEnvelope size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Email</h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    vaibhav.divya2202@gmail.com
                  </p>
                </div>
              </div>
            </a>

            {/* LINKEDIN */}
            <a
              href="https://linkedin.com/in/vaibhav-divya"
              target="_blank"
              className="block bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-400/10 p-4 rounded-2xl text-cyan-400">
                  <FaLinkedin size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">LinkedIn</h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    linkedin.com/in/vaibhav-divya
                  </p>
                </div>
              </div>
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/vaibhav-personal"
              target="_blank"
              className="block bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-400/10 p-4 rounded-2xl text-cyan-400">
                  <FaGithub size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">GitHub</h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    github.com/vaibhav-personal
                  </p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{
              once: true,
            }}
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-zinc-100 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Your Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-zinc-100 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full bg-zinc-100 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block mb-3 text-sm text-gray-600 dark:text-gray-400">
                  Message
                </label>

                <textarea
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full bg-zinc-100 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* SUCCESS */}
              {success && (
                <p className="text-green-400 text-center">{success}</p>
              )}

              {/* ERROR */}
              {error && <p className="text-red-400 text-center">{error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
