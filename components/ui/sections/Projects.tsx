"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
      );
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
        console.log("Projects API did not return array");
      }
    } catch (error) {
      console.log(error);
      setProjects([]);
    }
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
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
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 mb-4">Featured Projects</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Industry Experience Projects
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project: any, index: number) => (
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
                duration: 0.7,
                delay: index * 0.2,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
              }}
              className="group bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-cyan-400/40 transition duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.techStack
                    .split(",")
                    .map((tech: string, techIndex: number) => (
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
