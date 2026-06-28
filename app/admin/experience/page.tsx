"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";
export default function ExperiencePage() {
  const router = useRouter();

  const [experience, setExperience] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    location: "",
    points: "",
    technologies: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }

    fetchExperience();
  }, [router]);

  const fetchExperience = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience`);

    const data = await response.json();

    setExperience(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      technologies: formData.technologies.split(","),
      points: formData.points.split("\n"),
    };

    if (editingId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
        body: JSON.stringify(payload),
      });
    }

    setFormData({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      location: "",
      points: "",
      technologies: "",
    });
    setEditingId(null);
    fetchExperience();
  };

  const editExperience = (item: any) => {
    setEditingId(item._id);
    setFormData({
      company: item.company,
      role: item.role,
      startDate: item.startDate?.split("T")[0],
      endDate: item.endDate?.split("T")[0],
      currentlyWorking: item.currentlyWorking,
      location: item.location,
      points: item.points.join("\n"),
      technologies: item.technologies.join(", "),
    });
  };

  const deleteExperience = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("adminToken") || "" },
    });

    fetchExperience();
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-cyan-400 mb-3">Admin Panel</p>

          <h1 className="text-5xl font-bold">Experience Management</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 mb-16">
          {/* COMPANY */}
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* ROLE */}
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* DATES */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* START DATE */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400">
                Start Date
              </label>

              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value,
                  })
                }
                className="w-full bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="block mb-2 text-gray-600 dark:text-gray-400">
                End Date
              </label>

              <input
                type="date"
                value={formData.endDate}
                disabled={formData.currentlyWorking}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate: e.target.value,
                  })
                }
                className="w-full bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
              />
            </div>
          </div>

          {/* CURRENTLY WORKING */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.currentlyWorking}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentlyWorking: e.target.checked,
                })
              }
            />

            <label>Currently Working Here</label>
          </div>

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Experience Points (one per line)"
            rows={6}
            value={formData.points}
            onChange={(e) =>
              setFormData({ ...formData, points: e.target.value })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* TECHNOLOGIES */}
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({
                ...formData,
                technologies: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-cyan-400 text-black py-4 rounded-2xl font-semibold"
          >
            {editingId ? "Update Experience" : "Add Experience"}
          </button>
        </form>

        {/* EXPERIENCE LIST */}
        <div className="grid gap-8">
          {experience.map((item) => (
            <div
              key={item._id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-3">{item.company}</h2>

              <p className="text-cyan-400 mb-3">{item.role}</p>

              {/* DURATION */}
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {new Date(item.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}

                {" - "}

                {item.currentlyWorking
                  ? "Present"
                  : new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
              </p>

              <p className="text-gray-500 mb-6">{item.location}</p>

              <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
                {" "}
                {item.points?.map((point: string, pointIndex: number) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    {" "}
                    <span className="text-cyan-400 mt-1"> • </span>{" "}
                    <span> {point} </span>{" "}
                  </li>
                ))}{" "}
              </ul>

              {/* TECHNOLOGIES */}
              <div className="flex flex-wrap gap-3 mb-8">
                {item.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4">
                <button
                  onClick={() => editExperience(item)}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExperience(item._id)}
                  className="bg-red-500 px-5 py-3 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
