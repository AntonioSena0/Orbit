import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    return [
      {
        source: "/v1/:path*",
        destination: "http://localhost:8080/:path*",
      }
    ]
    
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: 'localhost',
        port: '8080',
        pathname: '/**'
      }
    ]
  },
  
  reactCompiler: true,
};

export default nextConfig;
