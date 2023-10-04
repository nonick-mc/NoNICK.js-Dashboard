export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='container space-y-6 py-3'>
      <section className='space-y-1'>
        <h1 className='text-4xl font-black'>サーバー選択</h1>
        <p className='text-muted-foreground'>
          NoNICK.jsの設定を行いたいサーバーを選択してください。
        </p>
      </section>
      {children}
    </main>
  );
}
