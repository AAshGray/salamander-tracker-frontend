export async function fetchVideos(): Promise<string[]> {
  const res = await fetch('http://localhost:3000/api/videos');
  if (!res.ok) console.error(res.status)
  return res.json();
}
