'use client';

import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'solar-icon-set';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant='light'
      disableRipple
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun
        size={22}
        iconStyle='Bold'
        className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
      />
      <Moon
        size={20}
        iconStyle='Bold'
        className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
