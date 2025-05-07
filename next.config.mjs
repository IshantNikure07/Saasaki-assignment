/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            domains: [process.env.Backend_Url],
          },
};

export default nextConfig;
