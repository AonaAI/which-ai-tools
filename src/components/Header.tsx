"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 shrink-0">
            <img src="/logo.png?v=2" alt="WhichAITools" className="h-8 sm:h-10 w-auto" />
            WhichAI<span className="text-brand-accent">Tools</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Directory</a>
            <a href="/compare/" className="text-gray-600 hover:text-gray-900 transition">Compare</a>
            <a href="/about/" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="https://aona.ai" target="_blank" rel="noopener noreferrer" className="bg-brand-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">
              Powered by Aona AI
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setOpen(false)}>Directory</a>
            <a href="/compare/" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setOpen(false)}>Compare</a>
            <a href="/about/" className="text-gray-600 hover:text-gray-900 transition" onClick={() => setOpen(false)}>About</a>
            <a href="https://aona.ai" target="_blank" rel="noopener noreferrer" className="bg-brand-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition text-center">
              Powered by Aona AI
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
