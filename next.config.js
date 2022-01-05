const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["kap-staging.us"],
  },
  env: {
    WP_HEADLESS_SECRET: "adb05f33-6f44-4433-9e79-9f995018b28a",
    WORDPRESS_GRAPHQL_ENDPOINT: "https://kap-staging.us/graphql",
    WORDPRESS_URL: "https://kap-staging.us/",
    MAPBOX_TOKEN:
      "pk.eyJ1Ijoia2FwaXR1cyIsImEiOiJjanR5and6MjYwMXltNDN0MWxnNTFoMGxpIn0.rbpYqdyv1o5OzsDLva85Sg",
    // WP_HEADLESS_SECRET: "f07a107b-9685-4a02-a3d9-6df5ba581b29",
    // WORDPRESS_GRAPHQL_ENDPOINT: "https://stagingdev-kap.com/graphql",
    // WORDPRESS_URL: "https://stagingdev-kap.com",
  },
};
module.exports = {
  assetPrefix: isProd ? "https://cdn.trustindex.io/" : "",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};
module.exports = withBundleAnalyzer(nextConfig);
