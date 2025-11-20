export async function fetchVideos(): Promise<string[]> {
  try {
    const res = await fetch('http://localhost:3000/api/videos'); // full API URL
    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.statusText}`);
    }
    const data: string[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return []; // return empty array on error
  }
}
