import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  label: string;
  href: string;
};

export function Promo({ label, href }: Props) {
  return (
    <Link
      href={href}
      className='mx-auto flex w-auto items-center gap-2 rounded-full bg-muted/50 px-6 py-2 text-sm shadow-lg transition-all hover:opacity-60'
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}
