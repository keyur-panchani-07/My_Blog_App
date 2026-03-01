import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Blog App",
  description: "A production-level blog application refactored with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Blogify
                </h1>
                <nav className="flex gap-6 items-center">
                  <a href="/blogs" className="font-medium hover:text-indigo-600 transition-colors">Blogs</a>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                    Sign In
                  </button>
                </nav>
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="border-t bg-white py-8 mt-12">
              <div className="container mx-auto px-4 text-center text-slate-500">
                <p>&copy; 2026 Blogify. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
