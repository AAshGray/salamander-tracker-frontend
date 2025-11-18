import Link from "next/link"
import Image from "next/image"
import sala1 from "../../public/VideoSala1.jpg"
import sala2 from "../../public/VideoSala2.jpg"

export default function Videos() {
    
    return (
        <main>
            <Image src={sala1} alt="" width={300} height={1000}></Image>
            <h1>Salamander Video List</h1>
            <ul>
                {/* link components goes here */}
                <li><Link href="videos/preview">Example List Item</Link></li>
            </ul>
            <Image src={sala2} alt="" width={300} height={1000}></Image>
        </main>
    );
}