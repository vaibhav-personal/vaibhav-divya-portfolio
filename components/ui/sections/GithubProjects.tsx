import { getGithubRepos } from "@/lib/github";

import { FaGithub, FaStar } from "react-icons/fa";

export default async function GithubProjects() {
  const repos = await getGithubRepos();

  const filteredRepos = repos.filter((repo: any) => !repo.fork).slice(0, 6);

  return (
    <section id="github" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-cyan-400 mb-4">GitHub Projects</p>

          <h2 className="text-4xl md:text-5xl font-bold">Things I’ve Built</h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map((repo: any) => (
            <div
              key={repo.id}
              className="bg-black/5 dark:bg-black/5 dark:bg-zinc-100/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/40 transition duration-300"
            >
              {/* Repo Name */}
              <h3 className="text-2xl font-bold mb-4">{repo.name}</h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 min-h-[80px]">
                {repo.description || "No description available."}
              </p>

              {/* Language */}
              <div className="flex items-center justify-between mb-6">
                <span className="bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm">
                  {repo.language || "Code"}
                </span>

                <div className="flex items-center gap-2 text-yellow-400">
                  <FaStar />

                  <span>{repo.stargazers_count}</span>
                </div>
              </div>

              {/* Button */}
              <a
                href={repo.html_url}
                target="_blank"
                className="flex items-center justify-center gap-3 bg-cyan-400 text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
              >
                <FaGithub />
                View Repository
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
