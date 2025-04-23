export const CACHE_TTL = 60 * 60 * 24;

export const linkClickCachekey = (ip: string, linkId: string) => `click:${ip}:${linkId}`;

export const linkSlugCachekey = (slug: string) => `link:${slug}`;
export const userLinksCachekey = (userId: string) => `links:${userId}`;
