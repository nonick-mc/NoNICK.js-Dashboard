'use client';

import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant='light'
      disableAnimation
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunIcon
        size={20}
        className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
      />
      <MoonIcon
        size={20}
        className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
