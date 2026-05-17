import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.epsemaq.com.pe",
      },
    ],
  },
};

export default nextConfig;
