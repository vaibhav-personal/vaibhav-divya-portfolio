export async function getGithubRepos() {
  const response = await fetch(
    "https://api.github.com/users/vaibhav-personal/repos",
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const repos = await response.json();

  return repos;
}
