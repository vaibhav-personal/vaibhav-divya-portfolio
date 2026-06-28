"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Wrench,
  LogOut,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Image,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",

      href: "/admin/dashboard",

      icon: LayoutDashboard,
    },

    {
      name: "Profile Picture",

      href: "/admin/hero",

      icon: Image,
    },

    {
      name: "Projects",

      href: "/admin/projects",

      icon: FolderKanban,
    },

    {
      name: "Skills",

      href: "/admin/skills",

      icon: Wrench,
    },

    {
      name: "Messages",

      href: "/admin/messages",

      icon: Mail,
    },

    {
      name: "Experience",

      href: "/admin/experience",

      icon: Briefcase,
    },

    {
      name: "Education",

      href: "/admin/education",

      icon: GraduationCap,
    },

    {
      name: "Certifications",

      href: "/admin/certifications",

      icon: Award,
    },

    {
      name: "Resume",

      href: "/admin/resume",

      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
        fixed

        top-5
        left-5

        z-[60]

        lg:hidden

        bg-cyan-400

        text-black

        p-3

        rounded-2xl

        shadow-lg
        shadow-cyan-400/20
        "
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0

          bg-black/50

          z-40

          lg:hidden
          "
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          lg:sticky

          top-0
          left-0

          z-50

          w-[280px]

          h-screen

          bg-white/80
          dark:bg-[#020617]/90

          backdrop-blur-2xl

          border-r
          border-black/10
          dark:border-white/10

          p-6

          flex
          flex-col

          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* MOBILE CLOSE */}
        <div
          className="
          flex
          items-center
          justify-between

          lg:hidden

          mb-8
          "
        >
          <h1
            className="
            text-xl
            font-bold

            text-cyan-400
            "
          >
            Admin Panel
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="
            text-gray-500
            hover:text-cyan-400

            transition
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* LOGO */}
        <div
          className="
          hidden
          lg:block

          mb-12
          "
        >
          <h1
            className="
            text-3xl
            font-bold

            text-cyan-400
            "
          >
            Portfolio
          </h1>

          <p
            className="
            text-sm

            text-gray-500
            dark:text-gray-400

            mt-2
            "
          >
            Manage portfolio content
          </p>
        </div>

        {/* NAVIGATION */}
        <div
          className="
          flex-1

          space-y-3

          overflow-y-auto scrollbar-hide
          "
        >
          {links.map((link, index) => {
            const Icon = link.icon;

            const isActive = pathname === link.href;

            return (
              <Link
                key={index}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                    group

                    flex
                    items-center
                    gap-4

                    px-5
                    py-4

                    rounded-2xl

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-cyan-400

                          text-black

                          font-semibold

                          shadow-lg
                          shadow-cyan-400/20
                        `
                        : `
                          text-gray-700
                          dark:text-gray-300

                          hover:bg-cyan-400/10
                          hover:text-cyan-400
                        `
                    }
                  `}
              >
                <Icon size={22} />

                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-4

          px-5
          py-4

          rounded-2xl

          text-red-400

          hover:bg-red-500/10

          transition-all
          duration-300

          mt-8

          w-full
          "
        >
          <LogOut size={22} />
          Logout
        </button>
      </aside>
    </>
  );
}
