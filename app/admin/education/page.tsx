"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";

export default function EducationPage() {
  const router = useRouter();
  const [education, setEducation] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
    grade: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }

    fetchEducation();
  }, [router]);

  const fetchEducation = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education`);

      const data = await response.json();

      setEducation(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education/${editingId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },

        body: JSON.stringify(formData),
      });
    } else {
      await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/education", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },

        body: JSON.stringify(formData),
      });
    }

    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      currentlyStudying: false,
      grade: "",
      description: "",
    });

    setEditingId(null);

    fetchEducation();
  };

  const editEducation = (item: any) => {
    setEditingId(item._id);

    setFormData({
      institution: item.institution,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy,
      startDate: item.startDate?.split("T")[0],
      endDate: item.endDate?.split("T")[0],
      currentlyStudying: item.currentlyStudying,
      grade: item.grade,
      description: item.description,
    });
  };

  const deleteEducation = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/education/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("adminToken") || "" },
    });

    fetchEducation();
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-cyan-400 mb-3">Admin Panel</p>

          <h1 className="text-5xl font-bold">Education Management</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 mb-16">
          {/* INSTITUTION */}
          <input
            type="text"
            placeholder="Institution"
            value={formData.institution}
            onChange={(e) =>
              setFormData({
                ...formData,
                institution: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* DEGREE */}
          <input
            type="text"
            placeholder="Degree"
            value={formData.degree}
            onChange={(e) =>
              setFormData({
                ...formData,
                degree: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* FIELD OF STUDY */}
          <input
            type="text"
            placeholder="Field of Study"
            value={formData.fieldOfStudy}
            onChange={(e) =>
              setFormData({
                ...formData,
                fieldOfStudy: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* DATE SECTION */}
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
                disabled={formData.currentlyStudying}
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

          {/* CURRENTLY STUDYING */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.currentlyStudying}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentlyStudying: e.target.checked,
                })
              }
            />

            <label>Currently Studying Here</label>
          </div>

          {/* GRADE */}
          <input
            type="text"
            placeholder="CGPA / Percentage"
            value={formData.grade}
            onChange={(e) =>
              setFormData({
                ...formData,
                grade: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* DESCRIPTION */}
          <textarea
            rows={5}
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-cyan-400 text-black py-4 rounded-2xl font-semibold"
          >
            {editingId ? "Update Education" : "Add Education"}
          </button>
        </form>

        {/* EDUCATION LIST */}
        <div className="grid gap-8">
          {education.map((item) => (
            <div
              key={item._id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-3">{item.institution}</h2>

              <p className="text-cyan-400 mb-3">{item.degree}</p>

              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {item.fieldOfStudy}
              </p>

              {/* DURATION */}
              <p className="text-gray-500 mb-5">
                {new Date(item.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}

                {" - "}

                {item.currentlyStudying
                  ? "Present"
                  : new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
              </p>

              {/* GRADE */}
              <p className="text-cyan-400 mb-5">{item.grade}</p>

              {/* DESCRIPTION */}
              <p className="leading-relaxed mb-8">{item.description}</p>

              {/* ACTIONS */}
              <div className="flex gap-4">
                <button
                  onClick={() => editEducation(item)}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEducation(item._id)}
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
