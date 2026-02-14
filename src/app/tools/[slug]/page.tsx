import { tools, getRiskLevel, getRiskColor } from '@/data/tools';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return tools.map(tool => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = tools.find(t => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} Security & Risk Assessment | WhichAITools`,
    description: `${tool.name} risk score, data privacy, compliance (SOC 2, GDPR, HIPAA), and security recommendations for enterprise use.`,
    keywords: [
      `${tool.name} security`,
      `${tool.name} data privacy`,
      `${tool.name} compliance`,
      `${tool.name} risk assessment`,
      tool.category,
    ],
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const riskLevel = getRiskLevel(tool.riskScore);
  const riskColor = getRiskColor(tool.riskScore);

  // Schema.org structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tool.name,
    description: tool.description,
    category: tool.category,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 10 - tool.riskScore, // Inverted so higher is better
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-brand-darker border-b border-brand-dark">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-4">
              <Link href="/" className="text-brand-accent hover:underline">
                ← Back to Directory
              </Link>
            </div>

            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold">{tool.name}</h1>
                  <span className={`${riskColor} text-white text-sm font-bold px-4 py-2 rounded-full`}>
                    {riskLevel} Risk
                  </span>
                </div>
                <p className="text-gray-400 mb-2">{tool.category}</p>
                <p className="text-xl text-gray-300">{tool.description}</p>
              </div>

              <div className="text-center bg-brand-dark rounded-lg px-8 py-6 border border-brand-accent">
                <div className="text-5xl font-bold text-white mb-2">
                  {tool.riskScore}
                </div>
                <div className="text-sm text-gray-400">Risk Score</div>
                <div className="text-xs text-gray-500 mt-1">(1-10 scale)</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Data Handling */}
              <section className="bg-brand-darker border border-brand-dark rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Data Handling</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Storage Location</h3>
                    <p className="text-white">{tool.dataHandling.storage}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Retention Policy</h3>
                    <p className="text-white">{tool.dataHandling.retention}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Training on User Data</h3>
                    <p className="text-white">{tool.dataHandling.training}</p>
                  </div>
                </div>
              </section>

              {/* Risk Factors */}
              <section className="bg-brand-darker border border-brand-dark rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Risk Factors</h2>
                <ul className="space-y-3">
                  {tool.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">⚠</span>
                      <span className="text-gray-300">{factor}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Recommendations */}
              <section className="bg-brand-darker border border-brand-dark rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Security Recommendations</h2>
                <ul className="space-y-3">
                  {tool.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Compliance */}
              <section className="bg-brand-darker border border-brand-dark rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white">Compliance</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SOC 2</span>
                    <span className={tool.compliance.soc2 ? 'text-green-400' : 'text-red-400'}>
                      {tool.compliance.soc2 ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">GDPR</span>
                    <span className={tool.compliance.gdpr ? 'text-green-400' : 'text-red-400'}>
                      {tool.compliance.gdpr ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">HIPAA</span>
                    <span className={tool.compliance.hipaa ? 'text-green-400' : 'text-red-400'}>
                      {tool.compliance.hipaa ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section
                className="rounded-lg p-6 text-center"
                style={{
                  background: 'linear-gradient(135deg, #2d1054 0%, #6412A6 100%)',
                }}
              >
                <h3 className="text-xl font-bold mb-3">Manage This Tool</h3>
                <p className="text-gray-200 text-sm mb-4">
                  Automatically monitor and control {tool.name} usage in your organization
                </p>
                <a
                  href="https://aona.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-brand-accent px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition w-full"
                >
                  Get Aona AI
                </a>
              </section>

              {/* Compare */}
              <section className="bg-brand-darker border border-brand-dark rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-white">Compare Tools</h3>
                <p className="text-gray-300 text-sm mb-4">
                  See how {tool.name} stacks up against alternatives
                </p>
                <Link
                  href="/compare/"
                  className="inline-block bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition w-full text-center"
                >
                  Compare Tools
                </Link>
              </section>
            </div>
          </div>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Other {tool.category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools
                .filter(t => t.category === tool.category && t.slug !== tool.slug)
                .slice(0, 3)
                .map(relatedTool => (
                  <Link
                    key={relatedTool.slug}
                    href={`/tools/${relatedTool.slug}/`}
                    className="block bg-brand-darker border border-brand-dark rounded-lg p-4 hover:border-brand-accent transition"
                  >
                    <h3 className="font-bold text-white mb-1">{relatedTool.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Risk: {relatedTool.riskScore}/10
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {relatedTool.description}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
