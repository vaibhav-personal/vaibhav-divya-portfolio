"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";
import toast from "react-hot-toast";

export default function AdminHeroPage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");

      return;
    }

    fetchHeroImage();
  }, [router]);

  // FETCH CURRENT HERO IMAGE
  const fetchHeroImage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hero`,
      );

      const data = await response.json();

      if (data?.image) {
        setPreview(data.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE FILE CHANGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // UPLOAD IMAGE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", image);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hero`,
        {
          method: "POST",
          headers: { Authorization: token || "" },
          body: formData,
        },
      );
      const data = await response.json(); // DEBUG RESPONSE
      console.log(data);
      if (response.ok) {
        toast.success("Hero image updated successfully");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
      min-h-screen
      bg-zinc-100
      dark:bg-black
      text-black
      dark:text-white
      flex
      "
    >
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
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
            Profile Image Management
          </h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
          bg-black/5
          dark:bg-zinc-100/5
          border
          border-black/10
          dark:border-white/10
          rounded-3xl
          p-8
          max-w-3xl
          "
        >
          {/* FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
            w-full
            bg-white
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            mb-8
            "
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Hero Preview"
              className="
              w-64
              h-64
              object-cover
              rounded-full
              border-4
              border-cyan-400
              mx-auto
              mb-8
              "
            />
          )}

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
            "
          >
            {loading ? "Uploading..." : "Update Profile Image"}
          </button>
        </form>
      </section>
    </main>
  );
}
