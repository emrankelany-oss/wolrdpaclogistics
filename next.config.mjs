import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      '@/schedule-engine/*': './schedule-engine/*',
    },
  },
};

export default withNextIntl(nextConfig);
