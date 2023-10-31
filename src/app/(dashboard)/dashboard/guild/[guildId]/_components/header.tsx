type Props = {
  title: string;
  description: string;
};

export function Header({ title, description }: Props) {
  return (
    <div className='grid items-start gap-1'>
      <h1 className='text-3xl font-black'>{title}</h1>
      <h2 className='text-muted-foreground'>{description}</h2>
    </div>
  );
}
