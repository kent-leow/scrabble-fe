export const APP_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001',
  STALE_TIME: process.env.NEXT_PUBLIC_STALE_TIME ?? 300000,
};
