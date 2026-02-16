'use client';

import { useState, useEffect } from 'react';
import { tools as staticTools, fetchTools, getRiskLevel, getRiskColor } from '@/data/tools';
import Link from 'next/link';

export default function ComparePage() {
  const [tools, setTools] = useState(staticTools);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  useEffect(() => {
    fetchTools().then(setTools);
  }, []);

  const toggleTool = (slug: string) => {
    if (selectedTools.includes(slug)) {
      setSelectedTools(selectedTools.filter(s => s !== slug));
    } else if (selectedTools.length < 3) {
      setSelectedTools([...selectedTools, slug]);
    }
  };

  const comparedTools = selectedTools.map(slug => tools.find(t => t.slug === slug)!);

  return (
    <main className="min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Compare AI Tools</h1>
          <p className="text-xl text-gray-600">
            Select up to 3 tools to compare their risk profiles, compliance, and data handling
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tool Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Select Tools ({selectedTools.length}/3)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools.map(tool => {
              const isSelected = selectedTools.includes(tool.slug);
              const isDisabled = !isSelected && selectedTools.length >= 3;

              return (
                <button
                  key={tool.slug}
                  onClick={() => toggleTool(tool.slug)}
                  disabled={isDisabled}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    isSelected
                      ? 'border-brand-accent bg-emerald-50'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 bg-white hover:border-brand-accent'
                  }`}
                >
                  <div className="font-bold text-gray-900 text-sm mb-1">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.category}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Risk: {tool.riskScore}/10
                  </div>
                </button>
              );
            })}
          </div>
        </section>

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
                  {/* Category */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Category</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.category}
                      </td>
                    ))}
                  </tr>

                  {/* Risk Score */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Risk Score</td>
                    {comparedTools.map(tool => {
                      const riskLevel = getRiskLevel(tool.riskScore);
                      const riskColor = getRiskColor(tool.riskScore);
                      return (
                        <td key={tool.slug} className="px-6 py-4 border-l border-gray-200">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-gray-900">
                              {tool.riskScore}/10
                            </span>
                            <span className={`${riskColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                              {riskLevel}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* SOC 2 */}
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

                  {/* GDPR */}
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

                  {/* HIPAA */}
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

                  {/* Storage */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Data Storage</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.storage}
                      </td>
                    ))}
                  </tr>

                  {/* Retention */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Retention Policy</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.retention}
                      </td>
                    ))}
                  </tr>

                  {/* Training */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">Training on Data</td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        {tool.dataHandling.training}
                      </td>
                    ))}
                  </tr>

                  {/* Risk Factors */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 align-top">
                      Risk Factors
                    </td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        <ul className="space-y-2">
                          {tool.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">⚠</span>
                              <span className="text-gray-600">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Recommendations */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 align-top">
                      Recommendations
                    </td>
                    {comparedTools.map(tool => (
                      <td key={tool.slug} className="px-6 py-4 text-sm text-gray-900 border-l border-gray-200">
                        <ul className="space-y-2">
                          {tool.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
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
              Select tools above to start comparing
            </p>
          </div>
        )}

        {/* CTA */}
        {comparedTools.length > 0 && (
          <section className="mt-12">
            <div
              className="rounded-2xl p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              }}
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
