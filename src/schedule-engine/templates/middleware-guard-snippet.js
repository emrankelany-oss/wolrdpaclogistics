// ============================================================
// SCHEDULE ENGINE — Middleware Guard Snippet (Alternative)
// ============================================================
// If you prefer middleware-level access control instead of
// per-page guards, add this logic to your middleware.js/ts.
//
// This approach blocks unpublished article routes at the
// middleware layer before the page even renders.
// ============================================================

import { NextResponse } from 'next/server';
import { isPublished } from '@/schedule-engine/access-control';

// Add your article route prefixes here
var ARTICLE_PREFIXES = ['/blog/', '/articles/', '/tutorials/'];

export function middleware(request) {
  var pathname = request.nextUrl.pathname;

  // Check if this is an article route
  var isArticleRoute = ARTICLE_PREFIXES.some(function(prefix) {
    return pathname.startsWith(prefix);
  });

  if (isArticleRoute && !isPublished(pathname)) {
    // Return 404 for unpublished articles
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export var config = {
  matcher: ['/blog/:path*', '/articles/:path*', '/tutorials/:path*'],
};
