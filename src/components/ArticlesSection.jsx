import Link from 'next/link';
import { getPublishedArticles } from '@/schedule-engine/access-control';

const articleData = {
  'article-ecommerce-tco': {
    title: 'The True Cost of E-Commerce Platforms in 2026',
    description: 'A deep-dive TCO comparison of Shopify, WooCommerce, BigCommerce, and Adobe Commerce across three revenue tiers.',
    image: '/assets/articles/article-ecommerce-tco-1.jpeg',
    tag: 'E-Commerce',
  },
  'article-inventory-framework': {
    title: 'The Four-Pillar Inventory Framework for Restaurants',
    description: 'A practical framework covering visibility, velocity, variance, and value to transform restaurant inventory into a profit lever.',
    image: '/assets/articles/article-inventory-framework-1.jpeg',
    tag: 'Inventory',
  },
  'article-mpos-hidden-math': {
    title: 'The Hidden Math Behind Mobile POS Systems',
    description: 'Decoding the real 3-year cost of Square, Clover, Toast, and SoftPOS — beyond the advertised rates.',
    image: '/assets/articles/article-mpos-hidden-math-1.jpeg',
    tag: 'Payments',
  },
};

export default function ArticlesSection() {
  const published = getPublishedArticles();

  if (published.length === 0) return null;

  const articles = published
    .filter((a) => articleData[a.slug])
    .map((a) => ({ ...a, ...articleData[a.slug] }));

  if (articles.length === 0) return null;

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-red-700 text-xs font-bold uppercase tracking-widest">
            Insights & Resources
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide text-gray-900 mt-3">
            Latest Articles
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Industry insights, cost analyses, and actionable frameworks to help you make smarter business decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={article.route}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {article.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-200 leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-red-700 text-xs font-bold uppercase tracking-wider mt-5">
                  Read Article
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
