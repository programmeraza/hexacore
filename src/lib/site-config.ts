/**
 * Single source of truth for the site's canonical URL and description, used
 * by layout metadata, robots.ts, sitemap.ts and manifest.ts. Override via
 * NEXT_PUBLIC_SITE_URL once a custom domain is attached in Vercel.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://my-portfolio-kappa-orcin-91.vercel.app';

export const SITE_NAME = 'NEUROTECH';

export const SITE_DESCRIPTION =
  'NEUROTECH — разработчик и интегратор корпоративных ИИ-решений: AI-агенты, компьютерное зрение, RAG и автоматизация бизнес-процессов под ключ.';
