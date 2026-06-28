"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/ui/admin/AdminSidebar";

export default function MessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
    }

    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`);

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: token || "" },
      });
      const data = await response.json();
      console.log(data);
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-cyan-400 mb-3">Admin Panel</p>

          <h1 className="text-5xl font-bold">Contact Messages</h1>
        </div>

        {/* EMPTY */}
        {messages.length === 0 && (
          <div className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-10 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No messages received yet.
            </p>
          </div>
        )}

        {/* MESSAGES */}
        <div className="grid gap-8">
          {messages.map((item) => (
            <div
              key={item._id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >
              {/* TOP */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  <p className="text-cyan-400 mt-2">{item.email}</p>
                </div>

                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              {/* SUBJECT */}
              {item.subject && (
                <div className="mb-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Subject
                  </p>

                  <p className="text-lg">{item.subject}</p>
                </div>
              )}

              {/* MESSAGE */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Message
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {item.message}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4">
                <a
                  href={`mailto:${item.email}`}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-xl font-medium"
                >
                  Reply
                </a>

                <button
                  onClick={() => deleteMessage(item._id)}
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
