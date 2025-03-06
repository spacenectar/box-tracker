const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    outputStyle: "expanded",
    indentWidth: 2,
    additionalData: `
      @use '@theme/vars' as *;
      @use '@theme/breakpoints' as bp;
      @use '@theme/typography' as type;
      @use '@theme/colours' as col;
      @use '@theme/utilities' as util;
      @use '@theme/animations' as animate;
    `,
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

export default nextConfig;
