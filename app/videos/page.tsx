'use client'
import Image from "next/image"
import sala1 from "@/public/VideoSala1.jpg"
import sala2 from "@/public/VideoSala2.jpg"
import VideoList from "@/components/videolist"
import {useState, useEffect} from 'react'
import { fetchVideos } from "@/lib/fetchVideos";
import {fakeVideos} from "@/mock/mock"

export default function Page() {
    const [videos, setVideos] = useState<string[]>([]);
    
    useEffect(() => {
        // fetchVideos()
        //     .then(data => setVideos(data))
        //     .catch(console.error);
        setVideos(fakeVideos);
    }, []);

    return (

        <main id="video-page">
            <Image src={sala1} alt="" width={300} height={1000}></Image>
            <div id="SalaList">
                <h1>Salamander Video List</h1>
                <VideoList 
                    videos={videos}
                />
            </div>
            
            <Image src={sala2} alt="" width={300} height={1000}></Image>

        </main>
    );
}