import { ReactNode } from 'react';
import { Nav } from './nav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <div className='container flex flex-col gap-6 pb-6'>
        <section className='space-y-1'>
          <h1 className='text-4xl font-black'>サーバー選択</h1>
          <p className='text-base text-default-500'>
            NoNICK.jsの設定を行いたいサーバーを選択してください。
          </p>
        </section>
        {children}
      </div>
    </>
  );
}
