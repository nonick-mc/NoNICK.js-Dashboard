import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nonick-js.com',
      lastModified: new Date(),
    }
  ]
}