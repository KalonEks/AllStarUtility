import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/owner/login",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/owner/inquiries",
        destination: "/admin/inquiries",
        permanent: true,
      },
      {
        source: "/owner/inquiries/:id",
        destination: "/admin/inquiries/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
