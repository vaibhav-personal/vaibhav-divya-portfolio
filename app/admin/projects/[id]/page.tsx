async function getProject(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    cache: "no-store",
  });

  const projects = await response.json();

  return projects.find((project: any) => project._id === id);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    return (
      <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-black dark:text-white px-6 py-32">
      <div className="max-w-5xl mx-auto">
        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[400px] object-cover rounded-3xl mb-12"
        />

        {/* Title */}
        <h1 className="text-5xl font-bold mb-8">{project.title}</h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>

          <div className="flex flex-wrap gap-4">
            {project.techStack.split(",").map((tech: string, index: number) => (
              <span
                key={index}
                className="bg-cyan-400/10 text-cyan-400 px-5 py-3 rounded-full border border-cyan-400/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        Links
        <div className="flex gap-6">
          <a
            href={project.github}
            target="_blank"
            className="bg-zinc-100/10 px-8 py-4 rounded-2xl"
          >
            GitHub
          </a>

          <a
            href={project.liveDemo}
            target="_blank"
            className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold"
          >
            Live Demo
          </a>
        </div>
      </div>
    </main>
  );
}
