export const BRAND = {
  blue: '#103B56',
  gold: '#D2B06A',
  light: '#F7F9FA',
};

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}
