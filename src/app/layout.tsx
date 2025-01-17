import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movie Reviews",
  description:
    "Welcome to Movie Reviews, your go-to platform for reviewing and discovering the latest movies. Share your thoughts, ratings, and connect with fellow movie lovers.",
  keywords:
    "movies, reviews, movie reviews, film ratings, user reviews, movie discovery, movie ratings, cinema, film reviews",
  authors: [{ name: "Gianbattista Vivolo" }],
  openGraph: {
    title: "Movie Reviews",
    description:
      "Join Movie Reviews to explore a wide variety of films, write your reviews, and interact with other movie fans.",
    url: "https://www.moviereviews.com",
    siteName: "Movie Reviews",
    type: "website",
  },
  icons: {
    icon: "/favicon", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/public/favicon.ico" sizes="any" /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
