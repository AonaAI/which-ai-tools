import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare AI Tools | WhichAITools',
  description: 'Compare AI tools side-by-side: risk scores, compliance (SOC 2, GDPR, HIPAA), data handling, and security recommendations.',
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
