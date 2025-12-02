import Link from 'next/link'

type Props = {
  videos: string[];
  loading: boolean | null;
  error: string | null;
};

export default function VideoList({ videos, loading, error }: Props) {
  
  if (loading == true) {
    return <ul><li>Loading ...</li></ul>
  } else {
    if (loading == false && (!videos || videos.length === 0)) {
      return <ul><li>There was an error loading videos or the videos directory was empty.</li></ul>
    }
  }

  return (
    <ul>
      {videos.map((name, index) => (
        <li key={index}>{name} &nbsp;
            <Link href={`/videos/preview?video=${encodeURIComponent(name)}`}>
            [Process]
            </Link>
        </li>
      ))}
    </ul>
  );
}