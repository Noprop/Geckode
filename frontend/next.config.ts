import path from 'path';
import { fileURLToPath } from 'url';
import type { NextConfig } from 'next';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Force a single Yjs instance (avoids "Yjs was already imported" / yjs#438).
// Use relative path strings so Turbopack on Windows works ("windows imports are not implemented yet").
const yjsResolveAlias: Record<string, string> = {
  yjs: './node_modules/yjs',
  'y-protocols': './node_modules/y-protocols',
};

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
    resolveAlias: yjsResolveAlias,
  },
  outputFileTracingRoot: path.resolve(__dirname),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...yjsResolveAlias,
    };
    return config;
  },
};

export default nextConfig;
