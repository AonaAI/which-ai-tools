import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "WhichAITools — AI Tools Risk Directory",
  description: "Security Ratings for Enterprise AI Tools — Know the Risk Before Your Employees Use It",
  keywords: ["AI tools", "security", "risk assessment", "enterprise AI", "data privacy", "compliance"],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
        <Header />
        {children}
        <footer className="border-t border-gray-200 mt-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500">
              <p className="mb-2">© 2026 WhichAITools — Powered by <a href="https://aona.ai" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">Aona AI</a></p>
              <p className="text-sm">Making AI tools safer for enterprise use</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
