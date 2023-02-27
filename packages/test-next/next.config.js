/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['database', 'prisma'],
  },
};

module.exports = nextConfig;
