"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  FolderKanban,
  Mail,
  Eye,
  Brain,
  Award,
  Briefcase,
  Download,
  Server,
  Database,
  ShieldCheck,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import AdminSidebar from "@/components/ui/admin/AdminSidebar";

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<any>({});

  const [heroImage, setHeroImage] = useState("");

  const [adminName] = useState("Vaibhav Divya");

  const [systemStatus, setSystemStatus] = useState<any>({});

  const [pageLoading, setPageLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState("");

  const [currentTime, setCurrentTime] = useState("");

  // LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // FETCH DASHBOARD
  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`,
      );

      if (!response.ok) {
        throw new Error("Dashboard fetch failed");
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH HERO IMAGE
  const fetchHeroImage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hero`,
      );

      const data = await response.json();

      if (data?.image) {
        setHeroImage(`${data.image}?t=${Date.now()}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH STATUS
  const fetchSystemStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/system-status`,
      );

      if (!response.ok) {
        throw new Error("Server Offline");
      }

      const data = await response.json();

      setSystemStatus({
        backendAPI: data.backendAPI || "Offline",

        mongoStatus: data.mongoStatus || "Disconnected",

        authStatus: data.authStatus || "Inactive",
      });
    } catch (error) {
      console.log(error);

      setSystemStatus({
        backendAPI: "Offline",

        mongoStatus: "Disconnected",

        authStatus: "Inactive",
      });
    }
  };

  // AUTH + AUTO REFRESH
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");

      return;
    }

    const loadDashboard = async () => {
      await Promise.all([
        fetchDashboard(),

        fetchHeroImage(),

        fetchSystemStatus(),
      ]);

      setLastUpdated(new Date().toLocaleTimeString());

      setPageLoading(false);
    };

    loadDashboard();

    const interval = setInterval(
      async () => {
        await Promise.all([
          fetchDashboard(),

          fetchHeroImage(),

          fetchSystemStatus(),
        ]);

        setLastUpdated(new Date().toLocaleTimeString());
      },

      5000,
    );

    return () => clearInterval(interval);
  }, [router]);

  // LOADING
  if (pageLoading) {
    return (
      <div
        className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-zinc-100
        dark:bg-black
        "
      >
        <div
          className="
          text-center
          "
        >
          <div
            className="
            w-16
            h-16

            border-4
            border-cyan-400
            border-t-transparent

            rounded-full

            animate-spin

            mx-auto
            mb-6
            "
          ></div>

          <h2
            className="
            text-xl
            font-semibold

            text-black
            dark:text-white
            "
          >
            Initializing Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  // DASHBOARD CARDS
  const dashboardCards = [
    {
      title: "Projects",

      value: stats.totalProjects || 0,

      icon: FolderKanban,
    },

    {
      title: "Messages",

      value: stats.totalMessages || 0,

      icon: Mail,
    },

    {
      title: "Visitors",

      value: stats.totalVisitors || 0,

      icon: Eye,
    },

    {
      title: "Skills",

      value: stats.totalSkills || 0,

      icon: Brain,
    },

    {
      title: "Experience",

      value: stats.totalExperience || 0,

      icon: Briefcase,
    },

    {
      title: "Certifications",

      value: stats.totalCertifications || 0,

      icon: Award,
    },

    {
      title: "Resume Downloads",

      value: stats.resumeDownloads || 0,

      icon: Download,
    },
  ];

  return (
    <main
      className="
  min-h-screen

  bg-white
  dark:bg-[#020617]

  relative

  overflow-hidden

  text-black
  dark:text-white

  flex
  "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
    absolute

    top-0
    right-0

    w-[500px]
    h-[500px]

    bg-cyan-400/10

    blur-[120px]

    rounded-full
    "
      ></div>

      <div
        className="
    absolute

    bottom-0
    left-0

    w-[400px]
    h-[400px]

    bg-blue-500/10

    blur-[120px]

    rounded-full
    "
      ></div>

      {/* SIDEBAR */}
      <div className="relative z-10">
        <AdminSidebar />
      </div>

      {/* CONTENT */}
      <section
        className="
    relative
    z-10

    flex-1

    p-5
    sm:p-8
    lg:p-10

    overflow-x-hidden
    "
      >
        {/* HEADER */}
        <div
          className="
      mb-14

      flex
      flex-col
      xl:flex-row

      items-start
      xl:items-center

      justify-between

      gap-8
      "
        >
          {/* LEFT */}
          <div>
            <p
              className="
          text-cyan-400
          mb-3
          "
            >
              Admin Dashboard
            </p>

            <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ">
              {" "}
              {new Date().getHours() < 5
                ? "Take Rest!"
                : new Date().getHours() < 12
                  ? "Good Morning"
                  : new Date().getHours() < 17
                    ? "Good Afternoon"
                    : "Good Evening"}{" "}
              , Vaibhav 👋{" "}
            </h1>

            <p
              className="
          text-gray-500
          dark:text-gray-400

          mt-4
          "
            >
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
        flex
        flex-wrap

        items-center

        gap-4
        "
          >
            {/* CLOCK */}
            <div
              className="
          flex
          items-center
          gap-3

          bg-white/70
          dark:bg-white/[0.03]

          backdrop-blur-2xl

          border
          border-black/10
          dark:border-white/10

          rounded-2xl

          px-5
          py-3
          "
            >
              <Clock3
                size={18}
                className="
            text-cyan-400
            "
              />

              <span
                className="
            text-sm
            font-medium
            "
              >
                {currentTime}
              </span>
            </div>

            {/* PROFILE */}
            <div
              className="
          flex
          items-center
          gap-4

          bg-white/70
          dark:bg-white/[0.03]

          backdrop-blur-2xl

          border
          border-black/10
          dark:border-white/10

          rounded-2xl

          px-5
          py-3
          "
            >
              <img
                src={heroImage || "/profile.jpg"}
                alt="Admin"
                className="
            w-12
            h-12

            sm:w-14
            sm:h-14

            rounded-full

            object-cover

            border-2
            border-cyan-400
            "
              />

              <div>
                <h2
                  className="
              font-bold
              "
                >
                  {adminName}
                </h2>

                <p
                  className="
              text-sm

              text-gray-500
              dark:text-gray-400
              "
                >
                  Administrator
                </p>
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* STATS GRID */}
        <div
          className="
      grid

      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4

      gap-6
      "
        >
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
              relative

              overflow-hidden

              bg-white/70
              dark:bg-white/[0.03]

              backdrop-blur-2xl

              border
              border-black/10
              dark:border-white/10

              rounded-3xl

              p-8

              hover:border-cyan-400/30
              hover:-translate-y-1

              transition-all
              duration-300
              "
              >
                {/* GLOW */}
                <div
                  className="
                absolute

                top-0
                right-0

                w-32
                h-32

                bg-cyan-400/10

                blur-3xl

                rounded-full
                "
                ></div>

                {/* ICON */}
                <div
                  className="
                relative

                w-14
                h-14

                rounded-2xl

                bg-cyan-400/10

                border
                border-cyan-400/20

                flex
                items-center
                justify-center

                mb-6
                "
                >
                  <Icon
                    size={28}
                    className="
                  text-cyan-400
                  "
                  />
                </div>

                <h2
                  className="
                text-4xl
                lg:text-5xl

                font-bold
                "
                >
                  {card.value}
                </h2>

                <p
                  className="
                text-gray-600
                dark:text-gray-400
                mb-3"
                >
                  {card.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* LOWER SECTION */}
        <div
          className="
      mt-14

      grid
      grid-cols-1
      xl:grid-cols-2

      gap-8
      "
        >
          {/* SYSTEM STATUS */}
          <div
            className="
        bg-white/70
        dark:bg-white/[0.03]

        backdrop-blur-2xl

        border
        border-black/10
        dark:border-white/10

        rounded-3xl

        p-8
        "
          >
            <h2
              className="
          text-2xl
          font-bold

          mb-8
          "
            >
              System Status
            </h2>

            <div
              className="
          space-y-6
          "
            >
              {/* BACKEND */}
              <div
                className="
            flex
            items-center
            justify-between
            "
              >
                <div
                  className="
              flex
              items-center
              gap-3
              "
                >
                  <Server
                    size={20}
                    className="
                text-cyan-400
                "
                  />

                  <span>Backend API</span>
                </div>

                <span
                  className={`
                px-3
                py-1.5

                rounded-full

                text-sm

                ${
                  systemStatus.backendAPI === "Online"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }
              `}
                >
                  {systemStatus.backendAPI}
                </span>
              </div>

              {/* MONGO */}
              <div
                className="
            flex
            items-center
            justify-between
            "
              >
                <div
                  className="
              flex
              items-center
              gap-3
              "
                >
                  <Database
                    size={20}
                    className="
                text-cyan-400
                "
                  />

                  <span>MongoDB Database</span>
                </div>

                <span
                  className={`
                px-3
                py-1.5

                rounded-full

                text-sm

                ${
                  systemStatus.mongoStatus === "Connected"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }
              `}
                >
                  {systemStatus.mongoStatus}
                </span>
              </div>

              {/* AUTH */}
              <div
                className="
            flex
            items-center
            justify-between
            "
              >
                <div
                  className="
              flex
              items-center
              gap-3
              "
                >
                  <ShieldCheck
                    size={20}
                    className="
                text-cyan-400
                "
                  />

                  <span>Admin Authentication</span>
                </div>

                <span
                  className={`
                px-3
                py-1.5

                rounded-full

                text-sm

                ${
                  systemStatus.authStatus === "Active"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }
              `}
                >
                  {systemStatus.authStatus}
                </span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div
            className="
        bg-white/70
        dark:bg-white/[0.03]

        backdrop-blur-2xl

        border
        border-black/10
        dark:border-white/10

        rounded-3xl

        p-8
        "
          >
            <h2
              className="
          text-2xl
          font-bold

          mb-8
          "
            >
              Quick Actions
            </h2>

            <div
              className="
          grid
          gap-4
          "
            >
              <Link
                href="/admin/projects"
                className="
            bg-cyan-400

            text-black

            py-4

            rounded-2xl

            text-center
            font-semibold

            hover:scale-[1.02]

            transition
            "
              >
                Manage Projects
              </Link>

              <Link
                href="/admin/resume"
                className="
            bg-cyan-400

            text-black

            py-4

            rounded-2xl

            text-center
            font-semibold

            hover:scale-[1.02]

            transition
            "
              >
                Manage Resume
              </Link>

              <Link
                href="/admin/hero"
                className="
            bg-cyan-400

            text-black

            py-4

            rounded-2xl

            text-center
            font-semibold

            hover:scale-[1.02]

            transition
            "
              >
                Update Profile Image
              </Link>

              <Link
                href="/admin/messages"
                className="
            bg-zinc-200
            dark:bg-zinc-100/10

            py-4

            rounded-2xl

            text-center
            font-semibold

            hover:bg-zinc-300
            dark:hover:bg-zinc-100/20

            transition
            "
              >
                View Messages
              </Link>

              <a
                href="/"
                target="_blank"
                className="
            bg-zinc-200
            dark:bg-zinc-100/10

            py-4

            rounded-2xl

            text-center
            font-semibold

            hover:bg-zinc-300
            dark:hover:bg-zinc-100/20

            transition
            "
              >
                Open Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
