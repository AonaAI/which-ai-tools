import { tools, fetchTools, fetchToolBySlug, getRiskLevel, getRiskColor } from '@/data/tools';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ToolLogo from '@/components/ToolLogo';

const BASE_URL = 'https://aitoolrisk.com';

const PRICING_COLORS: Record<string, string> = {
  Free: 'bg-green-100 text-green-700',
  Freemium: 'bg-blue-100 text-blue-700',
  Paid: 'bg-orange-100 text-orange-700',
  Enterprise: 'bg-purple-100 text-purple-700',
  'Contact Sales': 'bg-gray-100 text-gray-700',
};

export async function generateStaticParams() {
  const allTools = await fetchTools();
  return allTools.map(tool => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = await fetchToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const title = `${tool.name} Security & Risk Assessment | AI Tool Risk`;
  const description = tool.longDescription ||
    `${tool.name} risk score, data privacy, compliance (SOC 2, GDPR, HIPAA), and security recommendations for enterprise use.`;
  const url = `${BASE_URL}/tools/${tool.slug}/`;

  return {
    title,
    description,
    keywords: [
      `${tool.name} security`,
      `${tool.name} data privacy`,
      `${tool.name} compliance`,
      `${tool.name} risk assessment`,
      tool.category,
      ...(tool.tags || []),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AI Tool Risk',
      type: 'website',
      images: [
        {
          url: tool.logoUrl,
          width: 128,
          height: 128,
          alt: `${tool.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [tool.logoUrl],
    },
  };
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const allTools = await fetchTools();
  const tool = allTools.find(t => t.slug === params.slug);

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
    description: tool.longDescription || tool.description,
    category: tool.category,
    url: tool.websiteUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 10 - tool.riskScore, // Inverted so higher is better
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
  };

  const pricingColorClass = tool.pricing ? (PRICING_COLORS[tool.pricing] || 'bg-gray-100 text-gray-700') : '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-4">
              <Link href="/" className="text-brand-accent hover:underline">
                ← Back to Directory
              </Link>
            </div>

            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <ToolLogo name={tool.name} logoUrl={tool.logoUrl} size={48} />
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{tool.name}</h1>
                  <span className={`${riskColor} text-white text-sm font-bold px-4 py-2 rounded-full`}>
                    {riskLevel} Risk
                  </span>
                  {tool.pricing && (
                    <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${pricingColorClass}`}>
                      {tool.pricing}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 mb-2">{tool.category}</p>
                <p className="text-xl text-gray-600 mb-3">{tool.description}</p>
                {tool.websiteUrl && (
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-accent hover:underline text-sm"
                  >
                    {tool.websiteUrl} ↗
                  </a>
                )}
              </div>

              <div className="text-center bg-emerald-50 rounded-lg px-8 py-6 border border-brand-accent">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {tool.riskScore}
                </div>
                <div className="text-sm text-gray-500">Risk Score</div>
                <div className="text-xs text-gray-400 mt-1">(1-10 scale)</div>
              </div>
            </div>

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tool.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Long Description */}
              {tool.longDescription && (
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">About {tool.name}</h2>
                  <p className="text-gray-700 leading-relaxed">{tool.longDescription}</p>
                </section>
              )}

              {/* Key Features */}
              {tool.features && tool.features.length > 0 && (
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h2>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-brand-accent mt-1">✦</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Data Handling */}
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Data Handling</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Storage Location</h3>
                    <p className="text-gray-900">{tool.dataHandling.storage}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Retention Policy</h3>
                    <p className="text-gray-900">{tool.dataHandling.retention}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Training on User Data</h3>
                    <p className="text-gray-900">{tool.dataHandling.training}</p>
                  </div>
                </div>
              </section>

              {/* Risk Factors */}
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Risk Factors</h2>
                <ul className="space-y-3">
                  {tool.riskFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">⚠</span>
                      <span className="text-gray-600">{factor}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Recommendations */}
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Security Recommendations</h2>
                <ul className="space-y-3">
                  {tool.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Compliance */}
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Compliance</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">SOC 2</span>
                    <span className={tool.compliance.soc2 ? 'text-green-600' : 'text-red-500'}>
                      {tool.compliance.soc2 ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">GDPR</span>
                    <span className={tool.compliance.gdpr ? 'text-green-600' : 'text-red-500'}>
                      {tool.compliance.gdpr ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">HIPAA</span>
                    <span className={tool.compliance.hipaa ? 'text-green-600' : 'text-red-500'}>
                      {tool.compliance.hipaa ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Pricing info */}
              {tool.pricing && (
                <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Pricing</h2>
                  <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-full ${pricingColorClass}`}>
                    {tool.pricing}
                  </span>
                  {tool.websiteUrl && (
                    <div className="mt-3">
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-accent hover:underline text-sm"
                      >
                        Visit website ↗
                      </a>
                    </div>
                  )}
                </section>
              )}

              {/* Last Updated */}
              {tool.lastUpdated && (
                <p className="text-xs text-gray-400 text-center">
                  Last updated: {new Date(tool.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}

              {/* CTA */}
              <section
                className="rounded-lg p-6 text-center"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-white">Manage This Tool</h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Automatically monitor and control {tool.name} usage in your organization
                </p>
                <a
                  href="https://aona.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-emerald-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition w-full"
                >
                  Get Aona AI
                </a>
              </section>

              {/* Compare */}
              <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Compare Tools</h3>
                <p className="text-gray-600 text-sm mb-4">
                  See how {tool.name} stacks up against alternatives
                </p>
                <Link
                  href="/compare/"
                  className="inline-block bg-brand-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 transition w-full text-center"
                >
                  Compare Tools
                </Link>
              </section>
            </div>
          </div>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Other {tool.category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allTools
                .filter(t => t.category === tool.category && t.slug !== tool.slug)
                .slice(0, 3)
                .map(relatedTool => (
                  <Link
                    key={relatedTool.slug}
                    href={`/tools/${relatedTool.slug}/`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-accent transition shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900">{relatedTool.name}</h3>
                      {relatedTool.pricing && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRICING_COLORS[relatedTool.pricing] || 'bg-gray-100 text-gray-600'}`}>
                          {relatedTool.pricing}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Risk: {relatedTool.riskScore}/10
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2">
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
