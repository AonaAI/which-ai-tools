import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhichAITools — AI Tools Risk Directory",
  description: "Security Ratings for Enterprise AI Tools — Know the Risk Before Your Employees Use It",
  keywords: ["AI tools", "security", "risk assessment", "enterprise AI", "data privacy", "compliance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <header className="border-b border-brand-dark">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-white">
                WhichAI<span className="text-brand-accent">Tools</span>
              </a>
              <div className="flex items-center gap-6">
                <a href="/" className="text-gray-300 hover:text-white transition">Directory</a>
                <a href="/compare/" className="text-gray-300 hover:text-white transition">Compare</a>
                <a href="/about/" className="text-gray-300 hover:text-white transition">About</a>
                <a
                  href="https://aona.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Powered by Aona AI
                </a>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <footer className="border-t border-brand-dark mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400">
              <p className="mb-2">© 2026 WhichAITools — Powered by <a href="https://aona.ai" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Aona AI</a></p>
              <p className="text-sm">Making AI tools safer for enterprise use</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
