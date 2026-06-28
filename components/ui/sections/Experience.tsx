"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function Experience() {
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience`);

      const data = await response.json();

      setExperience(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="experience" className="py-32 px-6">
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
          <p className="text-cyan-400 mb-4">Work Experience</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Professional Journey
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative border-l border-cyan-400/30">
          {experience.map((item, index) => (
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
                    <h3 className="text-2xl font-bold">{item.role}</h3>

                    <p className="text-cyan-400 mt-2">{item.company}</p>
                  </div>

                  {/* DATE */}
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(item.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}

                    {" - "}

                    {item.currentlyWorking
                      ? "Present"
                      : new Date(item.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                  </span>
                </div>
                {/* LOCATION */}
                <p className="text-gray-500 mb-5">{item.location}</p>
                {/* DESCRIPTION */}{" "}
                <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
                  {" "}
                  {item.points?.map((point: string, pointIndex: number) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      {" "}
                      <span className="text-cyan-400 mt-1"> • </span>{" "}
                      <span> {point} </span>{" "}
                    </li>
                  ))}{" "}
                </ul>
                {/* TECHNOLOGIES */}
                <div className="flex flex-wrap gap-3">
                  {item.technologies?.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm border border-cyan-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
