import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "~/components/layout/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Iyo's Classroom | Book Lessons Online",
  description:
    "Learn Japanese online with Iyo Sensei. Personalized lessons for all levels, flexible scheduling, and native fluency guidance.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="dark:bg-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
