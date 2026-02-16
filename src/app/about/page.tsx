import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | WhichAITools Risk Directory',
  description: 'Learn about our AI tools risk assessment methodology and how we help enterprises evaluate AI tool security.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About WhichAITools</h1>
          <p className="text-xl text-gray-600">
            Helping enterprises understand and manage AI tool risk
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mission */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <div className="max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Employees are using AI tools every day—from ChatGPT to GitHub Copilot to Midjourney.
              But most organizations don't know which tools their teams are using, what data is being
              shared, or what the compliance implications are.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              WhichAITools provides a comprehensive, searchable directory of popular AI tools with
              detailed risk assessments, helping IT and security teams make informed decisions about
              AI tool usage in their organizations.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Risk Scoring Methodology</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-accent mb-3">
                How We Calculate Risk Scores (1-10 Scale)
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our risk scoring system evaluates AI tools across multiple dimensions to provide
                a holistic view of security and compliance risk:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ecfdf5 p-6 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
                <h4 className="font-bold text-gray-900 mb-2">Data Handling (40%)</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Where data is stored</li>
                  <li>• Retention policies</li>
                  <li>• Training on user inputs</li>
                  <li>• Data residency controls</li>
                </ul>
              </div>

              <div className="bg-ecfdf5 p-6 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
                <h4 className="font-bold text-gray-900 mb-2">Compliance (30%)</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• SOC 2 certification</li>
                  <li>• GDPR compliance</li>
                  <li>• HIPAA compliance</li>
                  <li>• Industry certifications</li>
                </ul>
              </div>

              <div className="bg-ecfdf5 p-6 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
                <h4 className="font-bold text-gray-900 mb-2">Security Controls (20%)</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Enterprise features</li>
                  <li>• Access controls</li>
                  <li>• Audit logging</li>
                  <li>• Data loss prevention</li>
                </ul>
              </div>

              <div className="bg-ecfdf5 p-6 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
                <h4 className="font-bold text-gray-900 mb-2">Transparency (10%)</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Privacy policy clarity</li>
                  <li>• Terms of service</li>
                  <li>• Security documentation</li>
                  <li>• Vendor reputation</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-brand-accent">
              <h4 className="font-bold text-gray-900 mb-4">Risk Level Interpretation</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 text-center">
                    Low (1-3)
                  </div>
                  <p className="text-gray-600 text-sm">
                    Enterprise-ready with strong security
                  </p>
                </div>
                <div>
                  <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 text-center">
                    Medium (4-5)
                  </div>
                  <p className="text-gray-600 text-sm">
                    Acceptable with proper configuration
                  </p>
                </div>
                <div>
                  <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 text-center">
                    High (6-7)
                  </div>
                  <p className="text-gray-600 text-sm">
                    Requires careful evaluation
                  </p>
                </div>
                <div>
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 text-center">
                    Critical (8-10)
                  </div>
                  <p className="text-gray-600 text-sm">
                    Not recommended for enterprise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Data Sources</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our risk assessments are based on publicly available information including:
          </p>
          <ul className="text-gray-600 space-y-2 ml-6">
            <li>• Vendor privacy policies and terms of service</li>
            <li>• Public security documentation and certifications</li>
            <li>• Compliance reports and attestations</li>
            <li>• Industry research and security analyses</li>
            <li>• Vendor websites and support documentation</li>
          </ul>
          <p className="text-gray-500 text-sm mt-4 italic">
            Last updated: February 2026. Risk scores and compliance information may change.
            Always verify directly with vendors for critical decisions.
          </p>
        </section>

        {/* About Aona AI */}
        <section
          className="rounded-2xl p-10"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Powered by Aona AI</h2>
          <p className="text-emerald-100 text-lg leading-relaxed mb-6">
            WhichAITools is brought to you by <strong>Aona AI</strong>, the AI governance platform
            that helps enterprises automatically discover, monitor, and control AI tool usage across
            their organization.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold text-white mb-2">Automatic Discovery</h3>
              <p className="text-emerald-100 text-sm">
                Detect AI tool usage across your network without agents
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-white mb-2">Risk Monitoring</h3>
              <p className="text-emerald-100 text-sm">
                Real-time risk scores and compliance tracking
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-white mb-2">Policy Enforcement</h3>
              <p className="text-emerald-100 text-sm">
                Block, allow, or redirect AI tools based on your policies
              </p>
            </div>
          </div>
          <div className="text-center">
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

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Questions or Feedback?</h2>
          <p className="text-gray-600 mb-6">
            We're constantly updating our directory with new tools and improved risk assessments.
          </p>
          <a
            href="https://aona.ai/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-accent hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </main>
  );
}
