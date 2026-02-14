'use client';

import { useState, useMemo } from 'react';
import { tools, getCategories, getRiskLevel, getRiskColor, type Category, type RiskLevel } from '@/data/tools';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'All'>('All');

  const categories = getCategories();
  const riskLevels: RiskLevel[] = ['Low', 'Medium', 'High', 'Critical'];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesRisk = selectedRisk === 'All' || getRiskLevel(tool.riskScore) === selectedRisk;
      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [searchQuery, selectedCategory, selectedRisk]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 0%, #6412A6 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Tools Risk Directory
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Know the Risk Before Your Employees Use It
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg bg-brand-darker border border-brand-dark text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === 'All'
                    ? 'bg-brand-accent text-white'
                    : 'bg-brand-darker text-gray-300 hover:bg-brand-dark'
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
                      : 'bg-brand-darker text-gray-300 hover:bg-brand-dark'
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
                    : 'bg-brand-darker text-gray-300 hover:bg-brand-dark'
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
                      : 'bg-brand-darker text-gray-300 hover:bg-brand-dark'
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
        <div className="mb-6 text-gray-300">
          Showing {filteredTools.length} of {tools.length} tools
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => {
            const riskLevel = getRiskLevel(tool.riskScore);
            const riskColor = getRiskColor(tool.riskScore);

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="block bg-brand-darker border border-brand-dark rounded-lg p-6 hover:border-brand-accent transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{tool.category}</p>
                  </div>
                  <div className={`${riskColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {riskLevel}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Risk Score: <span className="font-bold text-white">{tool.riskScore}/10</span>
                  </div>
                  <div className="flex gap-2">
                    {tool.compliance.soc2 && (
                      <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                        SOC 2
                      </span>
                    )}
                    {tool.compliance.gdpr && (
                      <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                        GDPR
                      </span>
                    )}
                    {tool.compliance.hipaa && (
                      <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded">
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
            <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #2d1054 0%, #6412A6 100%)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manage AI Tool Risk with Aona AI
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Automatically discover, monitor, and control AI tool usage across your organization
          </p>
          <a
            href="https://aona.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brand-accent px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Learn More About Aona AI
          </a>
        </div>
      </section>
    </main>
  );
}
