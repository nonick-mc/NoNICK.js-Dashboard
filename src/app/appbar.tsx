'use client';

import { Button, Navbar, Tooltip, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { BsSun, BsMoon } from 'react-icons/bs';
import Link from 'next/link';
import Logo from './logo';

interface collapseItem {
  label: string,
  href: string,
  blank?: boolean,
}

export function HomeAppBar() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const ThemeSwitcher = (
    <div
      className='cursor-pointer p-2 rounded-full hover:bg-gray-500/25'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      { isDark ? <BsSun size={20} /> : <BsMoon size={20}/> }
    </div>
  )

  const dashBoardButton = (
    <Tooltip
      color='primary'
      content='開発中！'
      placement='bottom'
    >
      <Button auto color='primary' flat disabled>ダッシュボード</Button>
    </Tooltip>
  )

  const items: collapseItem[] = [
    { label: 'Docs', href: 'https://docs.nonick-js.com', blank: true },
  ]

  return (
    <Navbar isBordered={isDark} variant='sticky' disableBlur maxWidth='fluid'>
      <Navbar.Brand>
        <Navbar.Toggle aria-label='toggle navigation' showIn='xs' css={{ paddingRight: 20 }} />
        <Link href='/'>
          <Logo width={150} height={50}/>
        </Link>
      </Navbar.Brand>

      <Navbar.Content
        enableCursorHighlight
        activeColor='primary'
        variant='highlight-rounded'
        hideIn='xs'
      >
        {items.map(({ label, href, blank }, index) => (
          <Navbar.Link
            as={Link}
            key={index}
            href={href}
            target={!!blank ? '_blank' : '_self'}
            rel={!!blank ? 'noopener noreferrer' : undefined}
          >
            {label}
          </Navbar.Link>
        ))}
      </Navbar.Content>

      <Navbar.Content showIn='xs'>
        {ThemeSwitcher}
      </Navbar.Content>

      <Navbar.Content gap={10} hideIn='xs'>
        {ThemeSwitcher}
        {dashBoardButton}
      </Navbar.Content>

      <Navbar.Collapse>
        {items.map(({ label, href, blank }, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              className='min-w-full text-inherit'
              key={index}
              href={href}
              target={!!blank ? '_blank' : '_self'}
              rel={!!blank ? 'noopener noreferrer' : undefined}
            >
              {label}
            </Link>
          </Navbar.CollapseItem>
        ))}
        <Navbar.CollapseItem>
          {dashBoardButton}
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  )
}