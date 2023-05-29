import { Badge, Card as NextCard } from '@nextui-org/react';
import { ReactNode } from 'react';

interface Props {
  title: string,
  description: string,
  icon: ReactNode,
  isNew: boolean
}

export default function FeatureCard({ title, description, icon, isNew }: Props) {
  const card = (
    <NextCard
      variant='bordered'
      isHoverable
      disableRipple
    >
      <NextCard.Header>
        <div className='flex items-center gap-2'>
          <div className='flex w-12 h-12 rounded-full bg-blue-500/25 items-center justify-center'>
            {icon}
          </div>
          <h4 className='m-0'>{title}</h4>
        </div>
      </NextCard.Header>

      <NextCard.Body css={{ paddingTop: 5 }}>
        <p>{description}</p>
      </NextCard.Body>
    </NextCard>
  )

  if (isNew) return (<Badge content='NEW' color='error' size='lg'>{card}</Badge>);
  else return (card);
}