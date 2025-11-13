import Link from "next/link"
export default function Videos() {
    
    return (
        <main>
            <h1>Salamander Video List</h1>
            <ul>
                {/* link components goes here */}
                <li><Link href="videos/preview">Example List Item</Link></li>
            </ul>
        </main>
    );
}