import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <main className="flex">
          <h1>Salamander Project</h1>
          <Link href="/videos">See Video List</Link>
      </main>
    </div>
  );
}
