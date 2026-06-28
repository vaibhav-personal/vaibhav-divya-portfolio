"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("adminToken");

      // NO TOKEN
      if (!token) {
        router.push("/admin/login");

        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        const currentTime = Date.now() / 1000;

        // TOKEN EXPIRED
        if (payload.exp < currentTime) {
          localStorage.removeItem("adminToken");

          router.push("/admin/login");
        }
      } catch (error) {
        localStorage.removeItem("adminToken");

        router.push("/admin/login");
      }
    };

    // INITIAL CHECK
    checkToken();

    // AUTO CHECK
    const interval = setInterval(
      checkToken,

      30000,
    );

    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
}
