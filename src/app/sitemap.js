const SITE_URL = 'https://mslclean.ru'

export default function sitemap() {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/privacy-policy`, priority: 0.2 },
  ]
}
