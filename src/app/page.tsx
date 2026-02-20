'use client';

import { useState, useMemo, useEffect } from 'react';
import { tools as staticTools, fetchTools, getCategories, getCategoriesFromTools, getRiskLevel, getRiskColor, type AITool, type Category, type RiskLevel } from '@/data/tools';

const PRICING_COLORS: Record<string, string> = {
  Free: 'bg-green-100 text-green-700',
  Freemium: 'bg-blue-100 text-blue-700',
  Paid: 'bg-orange-100 text-orange-700',
  Enterprise: 'bg-purple-100 text-purple-700',
  'Contact Sales': 'bg-gray-100 text-gray-700',
};
import Link from 'next/link';
import ToolLogo from '@/components/ToolLogo';

export default function Home() {
  const [allTools, setAllTools] = useState<AITool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const TOOLS_PER_PAGE = 36;

  useEffect(() => {
    fetchTools()
      .then(setAllTools)
      .catch(() => setAllTools(staticTools))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = allTools.length > 0 ? getCategoriesFromTools(allTools) : getCategories();
  const riskLevels: RiskLevel[] = ['Low', 'Medium', 'High', 'Critical'];

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesRisk = selectedRisk === 'All' || getRiskLevel(tool.riskScore) === selectedRisk;
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [allTools, searchQuery, selectedCategory, selectedRisk]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedRisk]);

  const totalPages = Math.ceil(filteredTools.length / TOOLS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * TOOLS_PER_PAGE,
    currentPage * TOOLS_PER_PAGE
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 0%, #10b981 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            AI Tools Risk Directory
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Know the Risk Before Your Employees Use It
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === 'All'
                    ? 'bg-brand-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === cat
                      ? 'bg-brand-accent text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Risk Level Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRisk('All')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedRisk === 'All'
                    ? 'bg-brand-accent text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Risk Levels
              </button>
              {riskLevels.map(risk => (
                <button
                  key={risk}
                  onClick={() => setSelectedRisk(risk)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedRisk === risk
                      ? 'bg-brand-accent text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <>
            <div className="mb-6 text-gray-400">Loading tools…</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-gray-200 rounded mt-1" />
                      <div>
                        <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                        <div className="h-3 bg-gray-100 rounded w-20" />
                      </div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                  </div>
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-4" />
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-100 rounded w-20" />
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-100 rounded w-12" />
                      <div className="h-5 bg-gray-100 rounded w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
        <>
        <div className="mb-6 text-gray-600">
          Showing {Math.min(currentPage * TOOLS_PER_PAGE, filteredTools.length)} of {filteredTools.length} tools
          {filteredTools.length !== allTools.length && ` (filtered from ${allTools.length})`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTools.map(tool => {
            const riskLevel = getRiskLevel(tool.riskScore);
            const riskColor = getRiskColor(tool.riskScore);

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-brand-accent transition group shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 flex items-start gap-3">
                    <div className="mt-1">
                      <ToolLogo name={tool.name} logoUrl={tool.logoUrl} size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-accent transition">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{tool.category}</p>
                    </div>
                  </div>
                  <div className={`${riskColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {riskLevel}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">
                      Risk: <span className="font-bold text-gray-900">{tool.riskScore}/10</span>
                    </div>
                    {tool.pricing && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRICING_COLORS[tool.pricing] || 'bg-gray-100 text-gray-600'}`}>
                        {tool.pricing}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {tool.compliance.soc2 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        SOC 2
                      </span>
                    )}
                    {tool.compliance.gdpr && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        GDPR
                      </span>
                    )}
                    {tool.compliance.hipaa && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        HIPAA
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            {(() => {
              const pages: (number | string)[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (currentPage > 4) pages.push('...');
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (currentPage < totalPages - 3) pages.push('...');
                pages.push(totalPages);
              }
              return pages.map((page, idx) =>
                typeof page === 'string' ? (
                  <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400">…</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-lg transition font-medium ${
                      currentPage === page
                        ? 'bg-brand-accent text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                )
              );
            })()}
            <button
              onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
        </>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Manage AI Tool Risk with Aona AI
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Automatically discover, monitor, and control AI tool usage across your organization
          </p>
          <a
            href="https://aona.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-emerald-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Learn More About Aona AI
          </a>
        </div>
      </section>
    </main>
  );
}
