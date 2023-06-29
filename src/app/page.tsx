import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Button asChild>
        <Link href='/dashboard'>ログイン</Link>
      </Button>
    </main>
  )
}
