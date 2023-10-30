import metadataConfig from '@/config/metadata';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard',
    },
    sitemap: `${metadataConfig.url}/sitemap.xml`,
  };
}
