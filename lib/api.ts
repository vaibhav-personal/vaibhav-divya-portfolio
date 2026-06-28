export async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      cache: "no-store",
    });

    return response.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}
