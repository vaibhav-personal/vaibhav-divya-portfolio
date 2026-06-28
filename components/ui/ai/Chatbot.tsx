"use client";

import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Bot, BotOff, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [aiOnline, setAiOnline] = useState(true);

  const [messages, setMessages] = useState([
    {
      sender: "ai",

      text: "Hi 👋 I'm Portfolio Assistant.\nAsk me about projects, skills, experience, or resume.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/health`,
        );

        if (response.ok) {
          setAiOnline(true);
        } else {
          setAiOnline(false);
        }
      } catch (error) {
        setAiOnline(false);
      }
    };

    // INITIAL CHECK
    checkServerStatus();

    // AUTO CHECK EVERY 5 SEC
    const interval = setInterval(
      checkServerStatus,

      5000,
    );

    return () => clearInterval(interval);
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",

      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message,
          }),
        },
      );

      const data = await response.json();

      const aiMessage = {
        sender: "ai",

        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }

    setMessage("");

    setLoading(false);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
        fixed

        bottom-6
        right-6

        z-50

        bg-cyan-400
        text-black

        p-4

        rounded-full

        shadow-lg
        shadow-cyan-400/30

        hover:scale-110

        transition-all
        duration-300
        "
      >
        <Bot size={28} />
      </button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 100,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
            fixed

            bottom-24
            right-6

            w-[350px]
            md:w-[400px]

            h-[500px]

            bg-gray-50
            dark:bg-[#0f172a]

            border
            border-black/10
            dark:border-white/10

            rounded-3xl

            backdrop-blur-xl
            shadow-2xl

            flex
            flex-col

            overflow-hidden

            z-50
            "
          >
            {/* HEADER */}
            <div
              className="
              p-5

              border-b
              border-black/10
              dark:border-white/10

              bg-cyan-400/10

              flex
              items-center
              justify-between
              "
            >
              <div>
                <h2
                  className="
                  text-xl
                  font-bold

                  text-cyan-500
                  dark:text-cyan-400
                  "
                >
                  Ask About Vaibhav
                </h2>

                <p
                  className="
                  text-sm

                  text-gray-600
                  dark:text-gray-400

                  mt-1
                  "
                >
                  AI Portfolio Assistant
                </p>
              </div>

              {/* ONLINE STATUS */}
              <div
                className={` flex items-center gap-2 px-3 py-1.5 rounded-full border ${aiOnline ? "bg-green-500/10 border-green-400/20" : "bg-red-500/10 border-red-400/20"} `}
              >
                <span
                  className={` text-xs font-medium ${aiOnline ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"} `}
                >
                  {aiOnline ? (
                    <Bot className="w-3 h-3 text-green-500 animate-pulse" />
                  ) : (
                    <BotOff className="w-3 h-3 text-red-500" />
                  )}
                </span>
              </div>
            </div>

            {/* MESSAGES */}
            <div
              className="
              flex-1

              overflow-y-auto

              p-4
              space-y-4
              "
            >
              {/* EMPTY STATE */}
              {messages.length === 0 && !loading && (
                <div
                  className="
                    h-full

                    flex
                    flex-col
                    items-center
                    justify-center

                    text-center

                    text-gray-500
                    dark:text-gray-400

                    px-6
                    "
                >
                  <div
                    className="
                      text-5xl
                      mb-4
                      "
                  >
                    🤖
                  </div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                      mb-2
                      "
                  >
                    Ask me anything
                  </h3>

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      "
                  >
                    Ask about skills, projects, experience, technologies,
                    resume, or contact details.
                  </p>
                </div>
              )}

              {/* CHAT MESSAGES */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`
                      max-w-[85%]

                      px-5
                      py-4

                      rounded-2xl

                      text-sm

                      shadow-sm
                      backdrop-blur-xl

                      ${
                        msg.sender === "user"
                          ? "bg-cyan-400 text-black ml-auto"
                          : "bg-white dark:bg-zinc-100/10 text-gray-800 dark:text-white border border-black/5 dark:border-white/10"
                      }
                    `}
                >
                  {/* AI MESSAGE */}
                  {msg.sender === "ai" ? (
                    <div
                      className="
                        space-y-3
                        leading-relaxed
                        "
                    >
                      {msg.text
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, i) => {
                          const isBullet =
                            line.startsWith("•") || line.startsWith("-");

                          return isBullet ? (
                            <div
                              key={i}
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

                              <p>{line.replace(/^[-•]\s*/, "")}</p>
                            </div>
                          ) : (
                            <p key={i}>{line}</p>
                          );
                        })}
                    </div>
                  ) : (
                    <p
                      className="
                        leading-relaxed
                        "
                    >
                      {msg.text}
                    </p>
                  )}
                </div>
              ))}

              {/* LOADING */}
              {loading && (
                <div
                  className="
                  flex
                  items-center
                  gap-3

                  bg-white
                  dark:bg-zinc-100/10

                  border
                  border-black/5
                  dark:border-white/10

                  px-5
                  py-4

                  rounded-2xl

                  shadow-md
                  backdrop-blur-xl

                  w-fit
                  "
                >
                  {/* DOTS */}
                  <div
                    className="
                    flex
                    items-center
                    gap-1
                    "
                  >
                    <span
                      className="
                      w-2
                      h-2

                      rounded-full

                      bg-cyan-400

                      animate-bounce
                      "
                    ></span>

                    <span
                      className="
                      w-2
                      h-2

                      rounded-full

                      bg-cyan-400

                      animate-bounce
                      [animation-delay:0.15s]
                      "
                    ></span>

                    <span
                      className="
                      w-2
                      h-2

                      rounded-full

                      bg-cyan-400

                      animate-bounce
                      [animation-delay:0.3s]
                      "
                    ></span>
                  </div>

                  <span
                    className="
                    text-sm

                    text-gray-700
                    dark:text-gray-300
                    "
                  >
                    AI is thinking...
                  </span>
                </div>
              )}

              {/* AUTO SCROLL */}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div
              className="
              p-4

              border-t
              border-black/10
              dark:border-white/10

              bg-white/70
              dark:bg-black/40

              backdrop-blur-xl

              flex
              items-center
              gap-3
              "
            >
              {/* INPUT */}
              <input
                type="text"
                placeholder="Ask AI assistant..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    sendMessage();
                  }
                }}
                disabled={loading}
                className="
                flex-1

                bg-white
                dark:bg-zinc-900/60

                text-black
                dark:text-white

                placeholder:text-gray-400

                border
                border-black/10
                dark:border-white/10

                rounded-2xl

                px-5
                py-4

                outline-none

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20

                transition-all
                duration-300
                "
              />

              {/* SEND BUTTON */}
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="
                bg-cyan-400

                text-black

                px-4
                py-4

                rounded-2xl

                flex
                items-center
                justify-center

                hover:scale-105
                hover:rotate-6

                active:scale-95

                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100

                transition-all
                duration-300

                shadow-lg
                shadow-cyan-400/20
                "
              >
                {loading ? (
                  <div
                    className="
                    w-5
                    h-5

                    border-2
                    border-black
                    border-t-transparent

                    rounded-full

                    animate-spin
                    "
                  ></div>
                ) : (
                  <Send size={20} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
