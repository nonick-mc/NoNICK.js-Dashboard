import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import Logo from '../logo';
import Link from 'next/link';
import AppBarConfig from '@/config/appbar';

export default function Appbar() {
  const isExternalLink = (href: string) => !href.startsWith('/');

  return (
    <Navbar className='py-2' maxWidth='2xl' position='sticky' isBlurred>
      <NavbarBrand>
        <Logo width={150} height={50}/>
      </NavbarBrand>
      <NavbarContent justify='center'>
        {AppBarConfig.map(({ name, href }, index) => (
          <NavbarItem
            className='hidden md:flex justify-start'
            as={Link}
            href={href}
            key={index}
            target={isExternalLink(href) ? '_blank' : '_self'}
            rel={isExternalLink(href) ? 'noreferrer noopener' : ''}
          >
            {name}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <Tooltip content='🔧開発中!'>
          <NavbarItem>
            <Button as={Link} href='/dashboard' color='primary' variant='flat' isDisabled>
              ダッシュボード
            </Button>
          </NavbarItem>
        </Tooltip>
      </NavbarContent>
    </Navbar>
  )
}