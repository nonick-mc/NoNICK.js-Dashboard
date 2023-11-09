import { Chip } from '@nextui-org/react';
import Link from 'next/link';

type Props = {
  label: string;
  href: string;
};

export function Promo({ label, href }: Props) {
  return (
    <Link href={href} passHref>
      <Chip classNames={{ base: 'text-sm py-4' }} variant='dot' color='primary' size='lg'>
        {label}
      </Chip>
    </Link>
  );
}
