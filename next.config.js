/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // pdf-parse uses CommonJS and needs to be bundled server-side only
  serverExternalPackages: ['pdf-parse'],
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
