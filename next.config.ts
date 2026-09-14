import type { NextConfig } from "next";

// Next.js's App Router injects inline <script> tags itself (RSC/streaming
// hydration payloads) even on fully static pages, so script-src needs
// 'unsafe-inline' unless every route opts into per-request nonces — which
// forces dynamic rendering and drops static generation/CDN caching for this
// otherwise-static marketing site. This mirrors Next's own documented
// "Without Nonces" CSP recipe. 'unsafe-eval' is dev-only (React's debug
// source-map reconstruction needs it; production never uses eval).
const isDev = process.env.NODE_ENV === 'development';
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
        ],
      },
    ];
  },
};

export default nextConfig;
