'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from '../../../components/ui/button';
import { BsDiscord } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function UserAuth() {
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  return (
    <div className='grid grid-rows-1 gap-3'>
      <Button
        className='flex items-center gap-2'
        disabled={isDiscordLoading}
        onClick={() => {
          setIsDiscordLoading(true);
          signIn('discord', {
            callbackUrl: searchParams?.get('from') || '/dashboard',
          });
        }}
      >
        {isDiscordLoading ? (
          <AiOutlineLoading3Quarters className='animate-spin' size={20} />
        ) : (
          <BsDiscord size={20} />
        )}
        <span>Discordでログイン</span>
      </Button>
      <Link
        href='https://docs.nonick-js.com/nonick-js/how-to-login'
        className={buttonVariants({ variant: 'outline' })}
      >
        ログインについて
      </Link>
    </div>
  );
}
