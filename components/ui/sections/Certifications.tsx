"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function Certifications() {
  const [certifications, setCertifications] = useState<any[]>([]);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certifications`);

      const data = await response.json();

      setCertifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
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
          <p className="text-cyan-400 mb-4">Certifications</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Courses & Credentials
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/40 transition duration-300"
            >
              {/* TITLE */}
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              {/* ORG */}
              <p className="text-cyan-400 mb-3">{item.organization}</p>

              {/* YEAR */}
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                {item.issueYear}
              </p>

              {/* DESC */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* URL */}
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  className="inline-block text-cyan-400 underline"
                >
                  View Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
