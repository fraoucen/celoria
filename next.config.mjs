/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
