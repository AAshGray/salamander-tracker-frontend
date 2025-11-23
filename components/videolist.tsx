import Link from 'next/link'

type Props = {
  videos: string[];
};

export default function VideoList({ videos }: Props) {
  
  if (!videos || videos.length === 0) {
    return <ul><li>Loading ...</li></ul>
  }

  return (
    <ul>
      {videos.map((name, index) => (
        <li key={index}>
            <Link href={`/videos/preview?video=${encodeURIComponent(name)}`}>
            {name}
          </Link></li>
      ))}
    </ul>
  );
}