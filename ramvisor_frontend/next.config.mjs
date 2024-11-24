import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@refinedev/antd"],
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5001/graphql',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ];
  }
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Wrap the config with bundle analyzer
export default bundleAnalyzerConfig(nextConfig);