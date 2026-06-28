"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";

export default function CertificationsPage() {
  const router = useRouter();

  const [certifications, setCertifications] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",

    organization: "",

    issueYear: "",

    credentialUrl: "",

    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }

    fetchCertifications();
  }, [router]);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certifications`);

      const data = await response.json();

      setCertifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certifications/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/certifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
        body: JSON.stringify(formData),
      });
    }

    setFormData({
      title: "",
      organization: "",
      issueYear: "",
      credentialUrl: "",
      description: "",
    });

    setEditingId(null);

    fetchCertifications();
  };

  const editCertification = (item: any) => {
    setEditingId(item._id);

    setFormData({
      title: item.title,
      organization: item.organization,
      issueYear: item.issueYear,
      credentialUrl: item.credentialUrl,
      description: item.description,
    });
  };

  const deleteCertification = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certifications/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("adminToken") || "" },
    });

    fetchCertifications();
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-cyan-400 mb-3">Admin Panel</p>

          <h1 className="text-5xl font-bold">Certifications Management</h1>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-6 mb-16">
          {/* TITLE */}
          <input
            type="text"
            placeholder="Certification Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* ORGANIZATION */}
          <input
            type="text"
            placeholder="Issuing Organization"
            value={formData.organization}
            onChange={(e) =>
              setFormData({
                ...formData,
                organization: e.target.value,
              })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* ISSUE DATE */}
          <input
            type="text"
            placeholder="Issue Year"
            value={formData.issueYear}
            onChange={(e) =>
              setFormData({ ...formData, issueYear: e.target.value })
            }
            className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4"
          />

          {/* URL */}
          <input
            type="text"
            placeholder="Credential URL"
            value={formData.credentialUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                credentialUrl: e.target.value,
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
            {editingId ? "Update Certification" : "Add Certification"}
          </button>
        </form>

        {/* LIST */}
        <div className="grid gap-8">
          {certifications.map((item) => (
            <div
              key={item._id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold mb-3">{item.title}</h2>

              <p className="text-cyan-400 mb-3">{item.organization}</p>

              <p className="text-gray-600 dark:text-gray-400 mb-5">
                {item.issueYear}
              </p>

              <p className="leading-relaxed mb-6">{item.description}</p>

              {/* URL */}
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  className="text-cyan-400 underline mb-6 block"
                >
                  View Credential
                </a>
              )}

              {/* ACTIONS */}
              <div className="flex gap-4">
                <button
                  onClick={() => editCertification(item)}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCertification(item._id)}
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
