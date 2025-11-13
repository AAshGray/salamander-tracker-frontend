import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"

export const metadata: Metadata = {
  title: "Salamander App",
  description: "An app for processing salamander videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // state and use effect gets set up here?

  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">Front Page</Link></li>
              <li>
                <Link href="/videos">Video List</Link></li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
