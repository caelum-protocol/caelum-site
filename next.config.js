// next.config.js
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // NEW: Transpile ESM packages (fixes Next.js/ESM/SSR issues)
  transpilePackages: [
    "viem",
    "wagmi",
    "ethers",
    // add others as needed
  ],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Polyfills for Node.js core modules used by Web3/Irys SDKs
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Do NOT try to bundle fs in browser
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
      };
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: ['process'],
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
