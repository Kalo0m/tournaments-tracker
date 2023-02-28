/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
    serverComponentsExternalPackages: ['database', 'prisma'],
  },
};

module.exports = nextConfig;
