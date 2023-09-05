import { Alert } from '@/app/(marketing)/alert'
import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

export type NavItem = {
  title: string,
  href: string,
  disabled?: boolean,
}

export type Link = {
  href: string,
  icon: LucideIcon
}

export type SiteConfig = {
  metadata: {
    name: string,
    description: string,
    url: URL,
  },
}

export type MarketingConfig = {
  alert: ComponentProps<typeof Alert> & { visible: boolean }
  mainNav: NavItem[],
  links: Link[],
  invite: string,
}

export type DashboardConfig = {
  sidebar: { label?: string, items: (Link & { label: string, badge?: string })[] }[]
}