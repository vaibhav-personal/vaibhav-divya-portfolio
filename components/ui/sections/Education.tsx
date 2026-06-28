"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Education() {
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education`);

      const data = await response.json();

      setEducation(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
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
          className="text-center mb-24"
        >
          <p className="text-cyan-400 mb-4">Education</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Academic Background
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative border-l border-cyan-400/30">
          {education.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                x: -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{
                once: true,
              }}
              className="mb-20 ml-10 relative"
            >
              {/* TIMELINE DOT */}
              <div className="absolute -left-[52px] top-2 w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_20px_#00d4ff]"></div>

              {/* CARD */}
              <div className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-cyan-400/40 transition duration-300">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{item.degree}</h3>

                    <p className="text-cyan-400 mt-2">{item.institution}</p>
                  </div>

                  {/* DATE */}
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(item.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}

                    {" - "}

                    {new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* FIELD */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.fieldOfStudy}
                </p>

                {/* GRADE */}
                <p className="text-cyan-400 mb-5">{item.grade}</p>

                {/* DESCRIPTION */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
