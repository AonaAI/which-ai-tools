'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { tools as staticTools, fetchTools, getRiskLevel, getRiskColor, getCategoriesFromTools } from '@/data/tools';
import Link from 'next/link';
import type { AITool as Tool } from '@/data/tools';

function ToolSearchSelector({
  tools,
  selectedSlugs,
  onSelect,
  placeholder,
}: {
  tools: Tool[];
  selectedSlugs: string[];
  onSelect: (slug: string) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const ref = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => getCategoriesFromTools(tools), [tools]);

  const filtered = useMemo(() => {
    let list = tools.filter(t => !selectedSlugs.includes(t.slug));
    if (categoryFilter !== 'All') {
      list = list.filter(t => t.category === categoryFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return list.slice(0, 50); // Show max 50 results for performance
  }, [tools, selectedSlugs, query, categoryFilter]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:border-brand-accent focus:outline-none bg-white"
      />
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Category filter tabs */}
          <div className="flex gap-1 p-2 border-b border-gray-100 overflow-x-auto">
            <button
              onClick={() => setCategoryFilter('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                categoryFilter === 'All'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  categoryFilter === cat
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Results */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">No tools found</div>
            ) : (
              filtered.map(tool => (
                <button
                  key={tool.slug}
                  onClick={() => { onSelect(tool.slug); setQuery(''); setIsOpen(false); }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0"
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{tool.name}</div>
                    <div className="text-xs text-gray-500">{tool.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${getRiskColor(tool.riskScore)} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                      {tool.riskScore}/10
                    </span>
                  </div>
                </button>
              ))
            )}
            {filtered.length === 50 && (
              <div className="px-4 py-2 text-xs text-gray-400 text-center bg-gray-50">
                Type to search from {tools.length.toLocaleString()} tools…
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const [tools, setTools] = useState(staticTools);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  useEffect(() => {
    fetchTools().then(setTools);
  }, []);

  const addTool = (slug: string) => {
    if (selectedTools.length < 3 && !selectedTools.includes(slug)) {
      setSelectedTools([...selectedTools, slug]);
    }
  };

  const removeTool = (slug: string) => {
    setSelectedTools(selectedTools.filter(s => s !== slug));
  };

  const comparedTools = selectedTools
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean) as Tool[];

  return (
    <main className="min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Compare AI Tools</h1>
          <p className="text-xl text-gray-600">
            Search and select up to 3 tools to compare their risk profiles, compliance, and data handling
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tool Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Select Tools ({selectedTools.length}/3)
          </h2>

          {/* Selected tool pills */}
          {comparedTools.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {comparedTools.map(tool => (
                <div
                  key={tool.slug}
                  className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-200 rounded-lg px-4 py-2"
                >
                  <span className="font-medium text-gray-900 text-sm">{tool.name}</span>
                  <span className={`${getRiskColor(tool.riskScore)} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                    {tool.riskScore}
                  </span>
                  <button
                    onClick={() => removeTool(tool.slug)}
                    className="ml-1 text-gray-400 hover:text-red-500 transition"
                    aria-label={`Remove ${tool.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Search input */}
          {selectedTools.length < 3 && (
            <ToolSearchSelector
              tools={tools}
              selectedSlugs={selectedTools}
              onSelect={addTool}
              placeholder={`Search ${tools.length.toLocaleString()} AI tools to compare…`}
            />
          )}

          {selectedTools.length >= 3 && (
            <p className="text-sm text-gray-500 mt-2">
              Maximum 3 tools selected. Remove one to add another.
            </p>
          )}
        </section>

        {/* Quick Compare: Popular Tools */}
        {comparedTools.length === 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Popular Comparisons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'ChatGPT vs Claude vs Gemini', slugs: ['chatgpt', 'claude', 'google-gemini'] },
                { label: 'GitHub Copilot vs Cursor vs Tabnine', slugs: ['github-copilot', 'cursor', 'tabnine'] },
                { label: 'Midjourney vs DALL-E vs Stable Diffusion', slugs: ['midjourney', 'dall-e', 'stable-diffusion'] },
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setSelectedTools(preset.slugs)}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-emerald-400 transition text-left"
                >
                  <div className="font-medium text-gray-900 text-sm">{preset.label}</div>
                  <div className="text-xs text-gray-500 mt-1">Click to compare</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {comparedTools.length > 0 ? (
          <section className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 w-48">
                      Criteria
                    </th>
                    {comparedTools.map(tool => (
                      <th
                        key={tool.slug}
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-l border-gray-200"
                      >
                        <div className="mb-2">{tool.name}</div>
                        <Link
                          href={`/tools/${tool.slug}/`}
                          className="text-xs text-brand-accent hover:underline font-normal"
                        >
                          View Details →
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Category</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Risk Score</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 border-l border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-900">{tool.riskScore}/10</span>
                          <span className={`${getRiskColor(tool.riskScore)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {getRiskLevel(tool.riskScore)}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">SOC 2 Certified</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm border-l border-gray-200">
                        <span className={tool.compliance.soc2 ? 'text-green-600' : 'text-red-500'}>
                          {tool.compliance.soc2 ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">GDPR Compliant</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm border-l border-gray-200">
                        <span className={tool.compliance.gdpr ? 'text-green-600' : 'text-red-500'}>
                          {tool.compliance.gdpr ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">HIPAA Compliant</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm border-l border-gray-200">
                        <span className={tool.compliance.hipaa ? 'text-green-600' : 'text-red-500'}>
                          {tool.compliance.hipaa ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Data Storage</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.storage}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Retention Policy</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.retention}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Training on Data</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.training}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 align-top">Risk Factors</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        <ul className="space-y-2">
                          {tool.riskFactors.map((factor, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">⚠</span>
                              <span className="text-gray-600">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 align-top">Recommendations</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        <ul className="space-y-2">
                          {tool.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">✓</span>
                              <span className="text-gray-600">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              Search and select tools above to start comparing
            </p>
          </div>
        )}

        {/* CTA */}
        {comparedTools.length > 0 && (
          <section className="mt-12">
            <div
              className="rounded-2xl p-12 text-center"
              style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Manage All Your AI Tools in One Place
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
        )}
      </div>
    </main>
  );
}
