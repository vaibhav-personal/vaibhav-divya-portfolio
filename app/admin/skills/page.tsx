"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";

export default function SkillsPage() {
  const router = useRouter();

  const [skills, setSkills] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }

    fetchSkills();
  }, [router]);

  const fetchSkills = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);

    const data = await response.json();

    setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${editingId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },

        body: JSON.stringify(formData),
      });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },

        body: JSON.stringify(formData),
      });
    }

    setFormData({
      name: "",
      category: "",
      icon: "",
    });

    setEditingId(null);

    fetchSkills();
  };

  const editSkill = (skill: any) => {
    setEditingId(skill._id);

    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon,
    });
  };

  const deleteSkill = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("adminToken") || "" },
    });

    fetchSkills();
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        <div className="mb-12">
          <p className="text-cyan-400 mb-3">Admin Panel</p>

          <h1 className="text-5xl font-bold">Skills Management</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 mb-16">
          <input
            type="text"
            placeholder="Skill Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-black dark:text-black dark:text-white"
          >
            <option value="" className="bg-zinc-100 dark:bg-black">
              Select Category
            </option>

            <option value="Frontend" className="bg-zinc-100 dark:bg-black">
              Frontend
            </option>

            <option
              value="State Management"
              className="bg-zinc-100 dark:bg-black"
            >
              State Management
            </option>

            <option value="APIs & Data" className="bg-zinc-100 dark:bg-black">
              APIs & Data
            </option>

            <option
              value="Architecture & Performance"
              className="bg-zinc-100 dark:bg-black"
            >
              Architecture & Performance
            </option>

            <option
              value="Tools & Platforms"
              className="bg-zinc-100 dark:bg-black"
            >
              Tools & Platforms
            </option>

            <option value="Backend" className="bg-zinc-100 dark:bg-black">
              Backend
            </option>

            <option value="Testing" className="bg-zinc-100 dark:bg-black">
              Testing
            </option>

            <option value="Cloud" className="bg-zinc-100 dark:bg-black">
              Cloud
            </option>

            <option value="Other" className="bg-zinc-100 dark:bg-black">
              Other
            </option>

            <option value="AI / GenAI" className="bg-zinc-100 dark:bg-black">
              AI / GenAI
            </option>
          </select>

          <input
            type="text"
            placeholder="Icon Name"
            value={formData.icon}
            onChange={(e) =>
              setFormData({
                ...formData,
                icon: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          <button
            type="submit"
            className="bg-cyan-400 text-black py-4 rounded-2xl font-semibold"
          >
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </form>

        {/* SKILLS */}
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-6"
            >
              <h2 className="text-2xl font-bold mb-3">{skill.name}</h2>

              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {skill.category}
              </p>

              <p className="text-cyan-400 mb-6">{skill.icon}</p>

              <div className="flex gap-4">
                <button
                  onClick={() => editSkill(skill)}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSkill(skill._id)}
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
