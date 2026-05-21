import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.epsemaq.com.pe",
      },
      {
        protocol: "https",
        hostname: "epsemaq.com.pe",
      },
    ],
  },
};

export default nextConfig;
