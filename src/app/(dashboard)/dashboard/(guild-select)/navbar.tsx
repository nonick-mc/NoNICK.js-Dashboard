import Logo from '@/components/logo';
import { Chip } from '@nextui-org/chip';
import Link from 'next/link';
import { UserDropdown } from '../user-dropdown';

export function NavBar() {
  return (
    <div className='px-[2rem] flex h-20 items-center justify-between gap-4 sm:gap-0'>
      <div className='flex items-center gap-3'>
        <Link href='/dashboard' aria-label='nonick.js' passHref>
          <Logo width={120} />
        </Link>
        <Chip
          size='sm'
          variant='flat'
          classNames={{ base: 'px-2', content: 'font-semibold' }}
        >
          Dashboard
        </Chip>
      </div>
      <UserDropdown />
    </div>
  );
}
