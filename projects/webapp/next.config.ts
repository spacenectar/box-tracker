const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    quietDeps: true,
    outputStyle: 'expanded',
    indentWidth: 2,
    // additionalData: `
    //   @use '@theme/vars' as *;
    //   @use '@theme/breakpoints' as bp;
    //   @use '@theme/typography' as type;
    //   @use '@theme/colours' as col;
    //   @use '@theme/utilities' as util;
    //   @use '@theme/animations' as animate;
    // `
  }
};

export default nextConfig;
