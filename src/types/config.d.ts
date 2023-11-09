import { LucideIcon } from 'lucide-react';

type href = `${'http' | 'https'}:/${string}` | `/${string}`;

export type MetadataConfig = {
  name: string;
  description: string;
  url: URL;
  twitter: {
    site: string;
    creator: string;
  };
};

export type MarketingConfig = {
  promo?: {
    label: string;
    href: href;
  };
  nav: {
    title: string;
    href: href;
  }[];
  links: {
    href: string;
    icon: LucideIcon;
  }[];
};

export type DashboardConfig = {
  sidebar: {
    label?: string;
    items: {
      label: string;
      icon: LucideIcon;
      href: href;
      badge?: string;
    }[];
  }[];
};
