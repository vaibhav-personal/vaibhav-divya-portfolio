"use client";

import { useState } from "react";

import AdminSidebar from "@/components/ui/admin/AdminSidebar";

export default function ResumePage() {
  const [resume, setResume] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess("");

    setError("");

    if (!resume) {
      setError("Please select a PDF file");

      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Admin token missing. Please login again.");

        setLoading(false);

        return;
      }

      const formData = new FormData();

      formData.append("resume", resume);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resume`,

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setSuccess("Resume uploaded successfully!");

      setResume(null);
    } catch (error: any) {
      console.log(error);

      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
      min-h-screen
      bg-gray-100
      dark:bg-black
      text-black
      dark:text-white
      flex
      "
    >
      <AdminSidebar />

      <section
        className="
        flex-1
        p-10
        "
      >
        {/* HEADER */}
        <div
          className="
          mb-12
          "
        >
          <p
            className="
            text-cyan-400
            mb-3
            "
          >
            Admin Panel
          </p>

          <h1
            className="
            text-5xl
            font-bold
            "
          >
            Resume Management
          </h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
          bg-white
          dark:bg-white/5
          border
          border-black/10
          dark:border-white/10
          rounded-3xl
          p-8
          max-w-2xl
          "
        >
          {/* FILE INPUT */}
          <div
            className="
            mb-6
            "
          >
            <label
              className="
              block
              mb-3
              font-medium
              "
            >
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="
              w-full
              bg-gray-100
              dark:bg-black/40
              border
              border-black/10
              dark:border-white/10
              rounded-2xl
              px-5
              py-4
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-cyan-400
            text-black
            py-4
            rounded-2xl
            font-bold
            hover:scale-[1.01]
            transition
            disabled:opacity-50
            "
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

          {/* SUCCESS */}
          {success && (
            <p
              className="
              text-green-500
              mt-5
              text-center
              "
            >
              {success}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p
              className="
              text-red-500
              mt-5
              text-center
              "
            >
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
