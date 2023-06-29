import { GuildSelector } from '@/components/forms/guild-select-form';
import { Logo } from '@/components/logo';
import { GuildSelectorSkelton } from '@/components/skelton/guild-select-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <div className='flex flex-col gap-5 items-center justify-center mt-10'>
        <Logo width={200} height={50}/>
        <Suspense fallback={<GuildSelectorSkelton />}>
          <GuildSelector />
        </Suspense>
      </div>
    </main>
  )
}