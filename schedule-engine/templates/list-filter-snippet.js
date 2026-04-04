// ============================================================
// SCHEDULE ENGINE — Article List Filter Snippet
// ============================================================
// Use this in your article listing page to exclude unpublished
// articles from the public view.
//
// Adjust the import path based on your project structure.
// ============================================================

import { getPublishedArticles } from '@/schedule-engine/access-control';

// getPublishedArticles() returns an array of registry entries
// that are currently published or past their scheduled time.
//
// Each entry has: { slug, route, filePath, status, publishAt, title }

export default function ArticleListPage() {
  var articles = getPublishedArticles();

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map(function(article) {
          return (
            <li key={article.slug}>
              <a href={article.route}>
                {article.title || article.slug}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
