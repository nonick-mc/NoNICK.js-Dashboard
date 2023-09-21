import Link from 'next/link';
import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';

type Props = {
  label: string;
  href: string;
};

export const Alert: FC<Props> = ({ label, href }) => {
  return (
    <Link
      href={href}
      className='mx-auto flex w-auto items-center gap-2 rounded-full bg-muted px-6 py-2 text-sm shadow-lg'
    >
      {label}
      <FiArrowRight />
    </Link>
  );
};
