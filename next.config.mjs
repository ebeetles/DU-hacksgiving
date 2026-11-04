/** @type {import('next').NextConfig} */
const nextConfig = {
  // Point the poster's QR code at /signup. The destination can change later
  // without reprinting anything.
  async redirects() {
    return [{ source: "/signup", destination: "/#signup", permanent: false }];
  },
};

export default nextConfig;
