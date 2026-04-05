// ============================================================
// SCHEDULE ENGINE — Article Page Guard Snippet
// ============================================================
// Add this to the top of each article page.js / page.tsx
// to prevent unpublished articles from being publicly accessible.
//
// Adjust the import path based on your project structure.
// If using @/ alias: '@/schedule-engine/access-control'
// If using relative: '../../schedule-engine/access-control'
// ============================================================

// --- For JavaScript (page.js) ---

import { notFound } from 'next/navigation';
import { isPublished } from '@/schedule-engine/access-control';

export default function ArticlePage() {
  // Replace '/section/slug' with this page's actual route
  if (!isPublished('/section/slug')) notFound();

  return (
    <div>
      {/* Your article content */}
    </div>
  );
}


// --- For TypeScript (page.tsx) ---
//
// import { notFound } from 'next/navigation';
// import { isPublished } from '@/schedule-engine/access-control';
//
// export default function ArticlePage() {
//   if (!isPublished('/section/slug')) notFound();
//
//   return (
//     <div>
//       {/* Your article content */}
//     </div>
//   );
// }
