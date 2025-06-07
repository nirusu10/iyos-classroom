import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ui-avatars.com/**')],
  },
}

export default nextConfig
