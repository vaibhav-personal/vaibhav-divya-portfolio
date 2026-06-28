export default function Footer() {
  return (
    <footer
      className="
      py-8
      border-t
      border-black/10
      dark:border-white/10
      text-center
      "
    >
      <div
        className="
        flex
        items-center
        justify-center
        gap-3
        text-sm
        "
      >
        <p
          className="
          text-gray-600
          dark:text-gray-400
          "
        >
          © 2026 Vaibhav Divya
        </p>

        <span
          className="
          text-gray-400
          "
        >
          •
        </span>

        <a
          href="/admin/dashboard"
          className="
          text-gray-500
          hover:text-cyan-400
          transition
          "
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
