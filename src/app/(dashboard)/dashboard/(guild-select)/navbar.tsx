import Logo from '@/components/logo';
import Link from 'next/link';
import { UserDropdown } from '../user-dropdown';

export function NavBar() {
  return (
    <div className='px-[2rem] flex h-20 items-center justify-between gap-4 sm:gap-0'>
      <Link href='/dashboard' aria-label='nonick.js' passHref>
        <Logo width={120} />
      </Link>
      <UserDropdown />
    </div>
  );
}
