import type {Key} from 'react';
import Link from 'next/link';

export default async function VideosList() {
    const res = await fetch(
        'http://localhost:3000/api/videos',
        {
            method: 'GET',
            cache: 'no-cache'
        });
    const videoList = await res.json();

    return (
        <ul>
            {videoList.map((video: string, i: Key) => (
                <li key={i}>{video} - <Link href={`/videos/preview/${encodeURIComponent(video)}}`}>Process</Link></li> 
            ))}
        </ul>
    )
}

