'use client'

import { Accordion, AccordionItem, AccordionItemProps, Link } from '@nextui-org/react';
import { useState } from 'react';
import { Book, HelpCircle } from 'react-feather';

export function UserFriendlySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 items-center'>
      <Accordion variant='shadow'>
        <AccordionItem
          className='px-5 rounded-lg'
          key='1'
          aria-label='公式ドキュメント'
          startContent={
            <div className='flex w-11 h-11 rounded-full bg-orange-500/25 text-orange-500 fill-orange-500 items-center justify-center'>
              <Book />
            </div>
          }
          title='公式ドキュメント'
        >
          導入方法から設定方法、各機能の使い方まで、NoNICK.jsのほぼ全てをまとめた
          <Link isExternal href='https://docs.nonick-js.com/'>公式ドキュメント</Link>
          を用意しています。ひと通り読むだけで、BOTをすぐに使えるようになります。
        </AccordionItem>
        <AccordionItem
          className='px-5 rounded-lg'
          key='2'
          aria-label='サポートサーバー'
          startContent={
            <div className='flex w-11 h-11 rounded-full bg-orange-500/25 text-orange-500 fill-orange-500 items-center justify-center'>
              <HelpCircle />
            </div>
          }
          title='サポートサーバー'
        >
          使い方ガイドを見てもわからないことがあった時には、
          <Link isExternal href='https://discord.gg/fVcjCNn733'>サポートサーバー</Link>
          に参加して専用チャンネルで質問をすることができます！送った質問は開発者が丁寧に回答いたします。
        </AccordionItem>
      </Accordion>
    </div>
  );
}