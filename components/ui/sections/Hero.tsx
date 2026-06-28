"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

export default function Hero() {
  const [heroImage, setHeroImage] = useState("");

  const [loading, setLoading] = useState(true);

  // FETCH HERO IMAGE
  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hero`,
      );

      const data = await response.json();

      if (data?.image) {
        setHeroImage(data.image);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      px-6
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
        top-20
        left-20
        "
      ></div>

      <div
        className="
        absolute
        w-[400px]
        h-[400px]
        bg-blue-500/20
        blur-[120px]
        rounded-full
        bottom-10
        right-10
        "
      ></div>

      {/* MAIN CONTENT */}
      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        gap-16
        items-center
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <p
            className="
            text-cyan-400
            mb-4
            text-lg
            "
          >
            Full Stack Developer
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            "
          >
            Building
            <span
              className="
              text-cyan-400
              "
            >
              {" "}
              AI-Powered{" "}
            </span>
            Digital Experiences
          </h1>

          <p
            className="
            text-gray-600
            dark:text-gray-400
            mt-8
            text-lg
            leading-relaxed
            max-w-xl
            "
          >
            I build scalable, responsive, and real-time web applications using
            React.js, Node.js, MongoDB, and modern frontend technologies.
          </p>

          {/* BUTTONS */}
          <div
            className="
            flex
            flex-wrap
            gap-4
            mt-10
            "
          >
            <a
              href="#projects"
              className="
              bg-cyan-400
              text-black
              px-7
              py-4
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
              duration-300
              "
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="
              border
              border-gray-300
              dark:border-gray-700
              px-7
              py-4
              rounded-2xl
              hover:bg-zinc-200
              dark:hover:bg-gray-900
              transition
              duration-300
              "
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="
          flex
          justify-center
          "
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
          }}
        >
          <motion.div
            className="
            relative
            "
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* GLOW RING */}
            <div
              className="
              absolute
              inset-0
              bg-cyan-400/20
              blur-3xl
              rounded-full
              "
            ></div>

            {/* LOADING SKELETON */}
            {loading ? (
              <div
                className="
                w-[320px]
                h-[420px]
                md:w-[400px]
                md:h-[500px]
                rounded-3xl
                bg-zinc-300
                dark:bg-zinc-800
                animate-pulse
                "
              ></div>
            ) : (
              <Image
                src={heroImage || "/profile.jpg"}
                alt="Vaibhav Divya"
                width={400}
                height={400}
                priority
                className="
                relative
                rounded-3xl
                border
                border-cyan-400/20
                shadow-2xl
                object-cover
                w-[320px]
                h-[420px]
                md:w-[400px]
                md:h-[500px]
                "
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
