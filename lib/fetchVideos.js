export async function fetchVideos() {
  try {
    const res = await fetch('http://localhost:3000/api/videos'); // full API URL
    if (res.ok) {
      const data = await res.json();
      console.log('Fetched videos:', data);
      return data;
    } 
  } catch (err) {
    console.error(err);
    return []; // return empty array on error
  }
}

// fetchVideos();