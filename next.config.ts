import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferUtil: "commonjs buffer-util",
    });

    return config;
  },
};

export default nextConfig;
