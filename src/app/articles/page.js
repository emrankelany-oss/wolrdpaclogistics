import Link from 'next/link';

export const metadata = {
  title: 'Articles | World Pac Logistics',
  description:
    'Insights and guides on freight forwarding, supply chain management, and global logistics from World Pac Logistics.',
};

const articles = [
  {
    slug: 'supply-chain-logistics-complete-guide-2026',
    title: 'Supply Chain Logistics 101: The Complete Guide for 2026',
    description:
      'Master supply chain logistics in 2026. Explore AI-powered automation, resilience strategies, sustainability practices, and the technology transforming global freight and distribution.',
    date: 'April 5, 2026',
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Articles</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <p className="text-sm text-gray-400 mb-1">{article.date}</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{article.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
