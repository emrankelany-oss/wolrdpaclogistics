import { notFound } from 'next/navigation';
import { isPublished } from '@/schedule-engine/access-control';
import ArticleClient from './ArticleClient';

export const metadata = {
  title: 'Supply Chain Logistics 101: The Complete Guide for 2026 | World Pac Logistics',
  description:
    'Master supply chain logistics in 2026. Explore AI-powered automation, resilience strategies, sustainability practices, and the technology transforming global freight and distribution.',
  keywords:
    'supply chain logistics, supply chain management, logistics 2026, AI logistics, warehouse automation, freight forwarding, last-mile delivery, sustainable supply chain, supply chain technology',
  openGraph: {
    title: 'Supply Chain Logistics 101: The Complete Guide for 2026',
    description:
      'Master supply chain logistics in 2026. Explore AI-powered automation, resilience strategies, sustainability practices, and the technology transforming global freight and distribution.',
    type: 'article',
    publishedTime: '2026-04-05T00:00:00.000Z',
    authors: ['World Pac Logistics'],
  },
};

export default function SupplyChainLogisticsPage() {
  if (!isPublished('/articles/supply-chain-logistics-complete-guide-2026')) notFound();
  return <ArticleClient />;
}
