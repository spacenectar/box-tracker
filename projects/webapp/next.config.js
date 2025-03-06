/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'markdown-loader'
    });
    return config;
  },
  sassOptions: {
    quietDeps: true,
    outputStyle: 'expanded',
    indentWidth: 4,
    additionalData: `
      @use '@theme/vars' as *;
      @use '@theme/breakpoints' as bp;
      @use '@theme/typography' as type;
      @use '@theme/colours' as col;
      @use '@theme/utilities' as util;
      @use '@theme/animations' as animate;
    `
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },

};

module.exports = nextConfig;
