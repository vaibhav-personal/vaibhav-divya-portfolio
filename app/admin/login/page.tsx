"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "adminToken",

          data.accessToken,
        );

        localStorage.setItem(
          "refreshToken",

          data.refreshToken,
        );

        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.log(error);

      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main
      className="
      min-h-screen

      bg-zinc-100
      dark:bg-[#020617]

      flex
      items-center
      justify-center

      px-6

      relative
      overflow-hidden
      "
    >
      {/* BACKGROUND GRID */}
      <div
        className="
        absolute
        inset-0

        opacity-[0.03]

        bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)]

        bg-[size:60px_60px]
        "
      ></div>

      {/* LOGIN CARD */}
      <div
        className="
        relative
        z-10

        w-full
        max-w-md

        bg-white/80
        dark:bg-white/[0.03]

        backdrop-blur-2xl

        border
        border-black/10
        dark:border-white/10

        rounded-[28px]

        overflow-hidden

        shadow-2xl
        "
      >
        {/* TOP ACCENT */}
        <div
          className="
          h-1

          bg-gradient-to-r

          from-cyan-400
          via-blue-500
          to-cyan-400
          "
        ></div>

        <div
          className="
          p-10
          "
        >
          {/* HEADER */}
          <div
            className="
            mb-10
            "
          >
            <div
              className="
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
              <LockKeyhole
                size={28}
                className="
                text-cyan-400
                "
              />
            </div>

            <p
              className="
              text-cyan-400

              text-sm
              font-medium

              mb-3
              "
            >
              Secure Admin Access
            </p>

            <h1
              className="
              text-4xl
              font-bold

              text-black
              dark:text-white

              mb-3
              "
            >
              Welcome back
            </h1>

            <p
              className="
              text-gray-600
              dark:text-gray-400

              leading-relaxed
              "
            >
              Login to manage your portfolio dashboard.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
            space-y-6
            "
          >
            {/* EMAIL */}
            <div>
              <label
                className="
                block

                text-sm

                text-gray-600
                dark:text-gray-400

                mb-3
                "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="
                w-full

                bg-white
                dark:bg-black/30

                border
                border-black/10
                dark:border-white/10

                rounded-2xl

                px-5
                py-4

                text-black
                dark:text-white

                outline-none

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20

                transition-all
                duration-300
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                className="
                block

                text-sm

                text-gray-600
                dark:text-gray-400

                mb-3
                "
              >
                Password
              </label>

              <div
                className="
                relative
                "
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
                  w-full

                  bg-white
                  dark:bg-black/30

                  border
                  border-black/10
                  dark:border-white/10

                  rounded-2xl

                  px-5
                  py-4
                  pr-14

                  text-black
                  dark:text-white

                  outline-none

                  focus:border-cyan-400
                  focus:ring-2
                  focus:ring-cyan-400/20

                  transition-all
                  duration-300
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                  absolute

                  right-5
                  top-1/2

                  -translate-y-1/2

                  text-gray-500
                  hover:text-cyan-400

                  transition
                  "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div
                className="
                bg-red-500/10

                border
                border-red-500/20

                text-red-400

                text-sm

                rounded-2xl

                px-4
                py-3
                "
              >
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full

              bg-cyan-400

              text-black

              py-4

              rounded-2xl

              font-semibold

              hover:scale-[1.01]

              active:scale-[0.99]

              transition-all
              duration-300

              disabled:opacity-70

              shadow-lg
              shadow-cyan-400/20
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
