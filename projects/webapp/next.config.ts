import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    outputStyle: 'expanded',
    indentWidth: 4,
    // additionalData: `
    //   @use 'styles/vars' as *;
    //   @use 'styles/breakpoints' as bp;
    //   @use 'styles/typography' as type;
    //   @use 'styles/colours' as col;
    //   @use 'styles/utilities' as util;
    //   @use 'styles/animations' as animate;
    // `
  }
};

export default nextConfig;
