/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Wanted to use param to change the name of Next js page, so that we can for instance name it home.page.tsx
   * Does not work currently
   * Throw error if only one page extension
   * With multiple extension, the pages are not found 404 error
   */
  // pageExtensions: ['page.tsx'],

  // Developement only feature to highlight potential issues in the code
  reactStrictMode: true,

  // Required otherwise next build with unwanted files, like .stories.tsx, spec, ...
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },

  experimental: {
    /**
     * Enable the use of root intrumentation hook, loaded at the start of the application
     * Used for loading environment variables and configuration
     */
    instrumentationHook: true,

    // Needed for the logger to work in the server components
    serverComponentsExternalPackages: ['pino', 'pino-pretty'],

    /**
     * Optimizes imports to reduce bundle size by converting named imports
     * to direct subpath imports (30-60% savings).
     *
     * @mantine/core and @mantine/hooks are set here according to Mantine setup.
     *
     * Requirements: ESM packages with independent components, no side effects.
     *
     * Troubleshoot: If issues occur (missing components, hook errors, size increases),
     * remove packages individually to identify problematic ones.
     */
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      'mantine-datatable', // Verified compatible
      'mantine-notifications', // Verified compatible
    ],
  },

  /**
   * Static export configuration
   *
   * Images strategy:
   * - Currently using unoptimized images as the app has minimal image requirements
   * - TODO: If image optimization becomes necessary (and still using static export), consider:
   *   1. Using a CDN service (Cloudinary, Imgix, etc.) with a custom loader
   *   2. Implementing self-hosted image optimization
   *   3. Pre-optimizing images during build time
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  output: 'export',
  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    // Ignored files in tsconfig.build was not working, This rule works to prevent compilation of development files (test, stories, and e2e files)
    config.module.rules.push({
      test: /(\.(spec|stories)\.[jt]sx?$)|(^test\/.*\.[jt]sx?$)/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

export default nextConfig;
