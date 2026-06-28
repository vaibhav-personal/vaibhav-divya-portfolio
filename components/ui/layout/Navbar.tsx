"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  "Home",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Contact",
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const [scrolled, setScrolled] = useState(false);

  const [resumeUrl, setResumeUrl] = useState("");

  // TRACK DOWNLOAD
  const trackResumeDownload = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/resume-download`,
        {
          method: "POST",
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH RESUME
  const fetchResume = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resume`,
      );

      const data = await response.json();

      if (data?.resumeUrl) {
        setResumeUrl(data.resumeUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResume();

    const handleScroll = () => {
      const sections = navLinks.map((link) => link.toLowerCase());

      const scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const offsetTop = element.offsetTop;

          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });

      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
      fixed
      top-0
      left-0
      w-full
      z-50
      border-b
      transition-all
      duration-300

      ${
        scrolled
          ? "bg-zinc-100 dark:bg-black/90 backdrop-blur-xl border-cyan-400/20 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
          : "bg-zinc-100 dark:bg-black/40 backdrop-blur-xl border-black/10 dark:border-white/10"
      }
      `}
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* LOGO */}
        <a
          href="#home"
          className="
          text-2xl
          font-bold
          tracking-wide
          "
        >
          <span
            className="
            text-black
            dark:text-white
            "
          >
            Vaibhav
          </span>

          <span
            className="
            text-cyan-400
            ml-1
            "
          >
            Divya
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          text-sm
          "
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`
                transition
                duration-300
                hover:text-cyan-400

                ${
                  activeSection === link.toLowerCase()
                    ? "text-cyan-400"
                    : "text-gray-700 dark:text-gray-300"
                }
                `}
            >
              {link}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <ThemeToggle />

          {/* RESUME BUTTON */}
          <div
            className="
            hidden
            md:block
            "
          >
            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackResumeDownload}
              className="
              bg-cyan-400
              text-black
              px-5
              py-2
              rounded-xl
              font-medium
              hover:scale-105
              transition
              duration-300
              "
            >
              Resume
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="
            md:hidden
            text-black
            dark:text-white
            "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
            md:hidden
            bg-zinc-100
            dark:bg-black/95
            border-t
            border-black/10
            dark:border-white/10
            overflow-hidden
            "
          >
            <div
              className="
              flex
              flex-col
              px-6
              py-6
              gap-6
              "
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`
                    transition
                    duration-300
                    hover:text-cyan-400

                    ${
                      activeSection === link.toLowerCase()
                        ? "text-cyan-400"
                        : "text-gray-700 dark:text-gray-300"
                    }
                    `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}

              {/* MOBILE RESUME */}
              <a
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackResumeDownload}
                className="
                bg-cyan-400
                text-black
                py-3
                rounded-xl
                font-semibold
                text-center
                "
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
