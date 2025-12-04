export async function fetchVideos() {
  try {
    const res = await fetch('http://localhost:3000/api/videos'); // full API URL
    if (res.ok) {
      const data = await res.json();
      console.log('Fetched videos:', data);
      return data;
    }  else {
      return Promise.reject(`Error fetching videos: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
}

export async function fetchThumbnail(filename) {
  try {
    const res = await fetch(`http://localhost:3000/api/thumbnail/${filename}`);
    if (res.ok) {
      const image = await res.blob();
      return image;
    } else {
      return Promise.reject(`Error fetching thumbnail: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
}

export async function getJobStatus(jobId) {
  try {
    const res = await fetch(`http://localhost:3000/${jobId}/status`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return Promise.reject(`Error fetching job status: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
}

export async function processVideo(filename, color, threshold) {
  try {
    const res = await fetch(`http://localhost:3000/process/${filename}?targetColor=${color}&threshold=${threshold}`, {
      method: 'POST'
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return Promise.reject(`Error processing video: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error(err);
    return Promise.reject(err.message);
  }
}