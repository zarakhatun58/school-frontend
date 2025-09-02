/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {  domains: [
      "localhost", 
      "management-backend-production-2db3.up.railway.app"
    ], }
};

export default nextConfig;
