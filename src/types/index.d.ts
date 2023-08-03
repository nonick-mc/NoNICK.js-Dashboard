import { Alert } from '@/components/marketing/alert'
import { ComponentProps } from 'react'
import { IconType } from 'react-icons'

export type NavItem = {
  title: string,
  href: string,
  disabled?: boolean,
}

export type Link = {
  href: string,
  icon: IconType
}

export type SiteConfig = {
  metadata: {
    name: string,
    description: string,
    url: string,
  },
}

export type MarketingConfig = {
  alert: ComponentProps<typeof Alert> & { visible: boolean }
  mainNav: NavItem[],
  links: Link[],
  invite: string,
}