import Link from 'next/link';
import { getPublishedArticles } from '../../../schedule-engine/access-control';

export const metadata = {
  title: 'Articles | World Pac Logistics',
  description:
    'Insights and guides on freight forwarding, supply chain management, and global logistics from World Pac Logistics.',
};

export default function ArticlesPage() {
  const articles = getPublishedArticles().filter(a => a.route.startsWith('/articles/'));

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Articles</h1>
        <div className="space-y-6">
          {articles.map((article) => (
            <Link key={article.slug} href={article.route} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
