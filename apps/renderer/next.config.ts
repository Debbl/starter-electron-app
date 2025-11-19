import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

// eslint-disable-next-line n/prefer-global/process
const isDev = process.env.NODE_ENV === 'development'

const withBundleAnalyzer = bundleAnalyzer({
  // eslint-disable-next-line n/prefer-global/process
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isDev ? undefined : './',
  reactCompiler: true,
}

export default withBundleAnalyzer(nextConfig)
