'use client';

import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsTwitter, BsGithub } from 'react-icons/bs';
import Logo from './logo';

interface Socials {
  name: string,
  url: string,
  icon: React.ReactNode
}

const iconSize = 25;

const socials: Socials[] = [
  { name: 'Source Code', url: 'https://github.com/nonick-mc/nonick.js', icon: <BsGithub size={iconSize}/> },
  { name: 'Twitter', url: 'https://twitter.com/nonick_js', icon: <BsTwitter size={iconSize}/> }
]

export default function Footer() {
  return (
    <div className='p-6'>
      <div className='flex gap-10 justify-center'>
        {socials.map(({ name, url, icon }, index) => (
          <Tooltip content={name} color='invert' key={index}>
            <Link
              href={url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='flex items-center justify-center bg-slate-500/15 p-2 rounded-full'>
                {icon}
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
      <div className='flex my-2 gap-3 justify-center'>
        <p>NoNICK.js</p>
        <p>by</p>
        <Link href='https://twitter.com/nonick_mc' target='_blank' rel='noopener noreferrer'>
          @nonick_mc
        </Link>
        <Link href='https://twitter.com/akki256' target='_blank' rel='noopener noreferrer'>
          @akki256
        </Link>
      </div>
    </div>
  )
};