const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  output: isDev ? undefined : 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig

