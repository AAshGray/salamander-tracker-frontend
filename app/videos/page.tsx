import Link from "next/link"
import Image from "next/image"
import sala1 from "../../public/VideoSala1.jpg"
import sala2 from "../../public/VideoSala2.jpg"

export default function Videos() {
    
    return (
        <main id="video-page">
            <Image src={sala1} alt="" width={300} height={1000}></Image>
            <div id="SalaList">
                <h1>Salamander Video List</h1>
                <ul>
                    {/* link components goes here */}
                    <li><Link href="videos/preview">Example List Item</Link></li>
                </ul>
            </div>
            
            <Image src={sala2} alt="" width={300} height={1000}></Image>
        </main>
    );
}