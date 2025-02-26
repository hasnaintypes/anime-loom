/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shikimori.one",
      },
    ],
  },
   experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
