"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillIcons } from "@/lib/skillIcons";

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  // GROUP SKILLS BY CATEGORY
  const groupedSkills = skills.reduce((groups: any, skill: any) => {
    const category = skill.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(skill);

    return groups;
  }, {});

  return (
    <section id="skills" className="py-32 px-6">
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
          <p className="text-cyan-400 mb-4">My Tech Stack</p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Technologies I Work With
          </h2>
        </motion.div>

        {/* CATEGORY SECTIONS */}
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(
            ([category, items]: any, categoryIndex) => (
              <motion.div
                key={category}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: categoryIndex * 0.1,
                }}
                viewport={{
                  once: true,
                }}
              >
                {/* CATEGORY TITLE */}
                <h3 className="text-2xl font-semibold mb-8 text-cyan-400">
                  {category}
                </h3>

                {/* SKILLS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {items.map((skill: any, index: number) => {
                    const Icon = skillIcons[skill.icon];

                    return (
                      <motion.div
                        key={index}
                        whileHover={{
                          scale: 1.05,
                        }}
                        className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-cyan-400/50 transition duration-300"
                      >
                        {/* ICON */}
                        <div className="text-cyan-400 mb-4">
                          {Icon && <Icon size={35} />}
                        </div>

                        {/* SKILL NAME */}
                        <h4 className="font-medium">{skill.name}</h4>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
