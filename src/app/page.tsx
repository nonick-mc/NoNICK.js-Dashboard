import Appbar from '@/components/home/appbar';
import { Button } from '@nextui-org/button';
import { Spacer } from '@nextui-org/spacer';
import { Link } from 'react-feather';
import { ArrowRight } from 'react-feather';

export default function Home() {
  return (
    <main>
      <Appbar />
      <div className='max-w-screen-2xl mx-auto px-6'>
        <div className='lg:flex'>
          <div className='lg:my-40 sm:text-center md:text-left'>
            <h1 className='text-5xl lg:text-7xl font-black'>
              <span className='inline-block'>
                あなたのサーバーを
              </span>
              <br className='hidden md:block'/>
              <span className='inline-block bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text'>
                簡単・効率的
              </span>
              <span className='inline-block'>
                に管理。
              </span>
            </h1>
            <p className='py-4 text-lg lg:text-2xl text-gray-500'>
              <span className='inline-block'>
                Discordサーバーの管理をサポートする
              </span>
              <span className='inline-block'>
                多機能BOT
              </span>
            </p>
            <div className='flex gap-3 my-5'>
              <Button size='xl' color='primary' endIcon={<ArrowRight />}>
                導入する
              </Button>
              <Button size='xl' color='primary' variant='flat'>
                サポートサーバー
              </Button>
            </div>
          </div>
        </div>

        <Spacer y={24} />

        <div className='text-center lg:text-left'>
          <h1 className='text-6xl lg:text-6xl font-black'>
            <span className='inline-block'>
              様々な機能を
            </span>
            <span className='inline-block bg-gradient-to-r from-sky-500 to-indigo-600 text-transparent bg-clip-text'>
              これ1つで。
            </span>
          </h1>
          <p className='py-4 text-md lg:text-2xl text-gray-500'>
            <span className='inline-block'>
              NoNICK.jsは、サーバー管理をサポートする
            </span>
            <span className='inline-block'>
              便利な機能を多数搭載しています。
            </span>
            <br className='hidden md:block'/>
            <span className='inline-block'>
              BOTを探すために時間を費やす必要はもうありません。
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
