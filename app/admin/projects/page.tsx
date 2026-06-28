"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/ui/admin/AdminSidebar";

interface Project {
  _id: string;

  title: string;

  description: string[];

  techStack: string;

  github?: string;

  liveDemo?: string;

  image?: string;
}

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [previewImage, setPreviewImage] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",

    description: "",

    techStack: "",

    github: "",

    liveDemo: "",

    image: null as File | null,
  });

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");

      return;
    }

    fetchProjects();
  }, [router]);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
      );

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData({
      ...formData,

      image: file,
    });

    setPreviewImage(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);

      data.append(
        "description",

        JSON.stringify(formData.description.split("\n")),
      );

      data.append("techStack", formData.techStack);

      data.append("github", formData.github);

      data.append("liveDemo", formData.liveDemo);

      if (formData.image) {
        data.append("image", formData.image);
      }

      // UPDATE
      if (editingId) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingId}`,

          {
            method: "PUT",

            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },

            body: data,
          },
        );
      }

      // CREATE
      else {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,

          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },

            body: data,
          },
        );
      }

      // RESET
      setFormData({
        title: "",

        description: "",

        techStack: "",

        github: "",

        liveDemo: "",

        image: null,
      });

      setPreviewImage("");

      setEditingId(null);

      fetchProjects();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteProject = async (id: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`,

        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const editProject = (project: Project) => {
    setEditingId(project._id);

    setFormData({
      title: project.title,

      description: project.description.join("\n"),

      techStack: project.techStack,

      github: project.github || "",

      liveDemo: project.liveDemo || "",

      image: null,
    });

    setPreviewImage(project.image || "");

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
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
      <AdminSidebar />

      {/* CONTENT */}
      <section
        className="
        flex-1
        p-10
        overflow-y-auto
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
            Project Management
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
          mb-16
          space-y-6
          "
        >
          {/* TITLE */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
            "
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Points (one per line)"
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
            h-40
            "
            required
          />

          {/* TECH STACK */}
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB..."
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
            "
            required
          />

          {/* GITHUB */}
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
            "
          />

          {/* LIVE DEMO */}
          <input
            type="text"
            name="liveDemo"
            value={formData.liveDemo}
            onChange={handleChange}
            placeholder="Live Demo URL"
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            outline-none
            "
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
            w-full
            bg-zinc-100
            dark:bg-black/40
            border
            border-black/10
            dark:border-white/10
            rounded-2xl
            px-5
            py-4
            "
          />

          {/* PREVIEW */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="
              w-full
              h-64
              object-cover
              rounded-2xl
              border
              border-black/10
              dark:border-white/10
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
            {loading
              ? "Processing..."
              : editingId
                ? "Update Project"
                : "Add Project"}
          </button>
        </form>

        {/* PROJECT GRID */}
        <div
          className="
          grid
          md:grid-cols-2
          gap-8
          "
        >
          {projects.map((project) => (
            <div
              key={project._id}
              className="
                bg-black/5
                dark:bg-zinc-100/5
                border
                border-black/10
                dark:border-white/10
                rounded-3xl
                overflow-hidden
                "
            >
              {/* IMAGE */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full
                    h-60
                    object-cover
                    "
                />
              )}

              {/* CONTENT */}
              <div
                className="
                  p-6
                  "
              >
                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-5
                    "
                >
                  {project.title}
                </h2>

                {/* BULLET DESCRIPTION */}
                <ul
                  className="
                    space-y-3
                    text-gray-600
                    dark:text-gray-400
                    mb-6
                    "
                >
                  {project.description?.map((point: string, index: number) => (
                    <li
                      key={index}
                      className="
                          flex
                          items-start
                          gap-3
                          "
                    >
                      <span
                        className="
                            text-cyan-400
                            mt-1
                            "
                      >
                        •
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* ACTIONS */}
                <div
                  className="
                    flex
                    gap-4
                    "
                >
                  <button
                    onClick={() => editProject(project)}
                    className="
                      bg-cyan-400
                      text-black
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                      "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="
                      bg-red-500
                      px-5
                      py-3
                      rounded-xl
                      "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
