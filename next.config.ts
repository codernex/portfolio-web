import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "ap-south-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
