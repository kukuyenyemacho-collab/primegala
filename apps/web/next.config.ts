import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Lets `pnpm dev` serve its assets through GitHub Codespaces port forwarding.
  allowedDevOrigins: ["*.app.github.dev"],
  transpilePackages: ["@primegala/contracts"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/terms", destination: "/legal/terms-of-use", permanent: true },
      { source: "/blog", destination: "/health-hub", permanent: true },
      { source: "/blog/:slug", destination: "/health-hub/:slug", permanent: true },
      { source: "/appointments", destination: "/book", permanent: true },
      { source: "/directions", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
