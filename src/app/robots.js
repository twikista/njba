export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/dashboard', '/auth'] }],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
