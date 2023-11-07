import metadataConfig from '@/config/metadata';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${metadataConfig.url}`,
      lastModified: new Date(),
    },
    {
      url: `${metadataConfig.url}/login`,
      lastModified: new Date(),
    },
  ];
}
