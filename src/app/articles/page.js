import Link from 'next/link';
import { getPublishedArticles } from '@/schedule-engine/access-control';

export const metadata = {
  title: 'Articles | World Pac Logistics',
  description:
    'Insights and guides on freight forwarding, supply chain management, and global logistics from World Pac Logistics.',
};

export default function ArticlesPage() {
  const articles = getPublishedArticles();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Articles</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={article.route}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <p className="text-sm text-gray-400 mb-1">
                {article.publishAt ? new Date(article.publishAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{article.title || article.slug}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
