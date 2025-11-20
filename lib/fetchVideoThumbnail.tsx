type ThumbnailError = {
  error: string;
};

type ThumbnailResponse = Blob | ThumbnailError;

export default function fetchThumbnail(filename: string): Promise<ThumbnailResponse> {
    return fetch(`/thumbnail/${filename}`).then(async (res) => {
    if (!res.ok) {
      return res.json() as Promise<ThumbnailError>;
    }
    return res.blob();
  });
}