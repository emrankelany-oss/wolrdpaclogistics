import { notFound } from 'next/navigation';
import { isPublished } from '@/schedule-engine/access-control';
import ArticleClient from './ArticleClient';

export const metadata = {
  title: 'Freight Forwarding Explained: What It Is, How It Works, and Why It Matters | World Pac Logistics',
  description:
    'Learn what freight forwarding is, how it works step by step, and why it matters for global trade. Explore services, key documents, and how to choose the right forwarder in 2026.',
  keywords:
    'freight forwarding, freight forwarder, international shipping, customs clearance, ocean freight, air freight, supply chain, logistics, global trade, freight broker, cargo shipping',
  openGraph: {
    title: 'Freight Forwarding Explained: What It Is, How It Works, and Why It Matters',
    description:
      'Learn what freight forwarding is, how it works step by step, and why it matters for global trade. Explore services, key documents, and how to choose the right forwarder in 2026.',
    type: 'article',
    publishedTime: '2026-04-05T00:00:00.000Z',
    authors: ['World Pac Logistics'],
  },
};

export default function FreightForwardingExplainedPage() {
  if (!isPublished('/articles/freight-forwarding-explained')) notFound();
  return <ArticleClient />;
}
