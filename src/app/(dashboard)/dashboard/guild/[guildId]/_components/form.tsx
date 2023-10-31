import { Button } from '@/components/ui/button';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

type FormItemLayoutProps = {
  title: string;
  description?: string;
  layout?: 'row' | 'col';
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
};

export function FormItemLayout({
  title,
  description,
  disabled,
  required,
  children,
  layout = 'row',
}: FormItemLayoutProps) {
  return (
    <FormItem
      className={cn(
        'flex space-y-0',
        { 'flex-col justify-start gap-2': layout === 'col' },
        { 'items-center justify-between': layout === 'row' },
      )}
    >
      <div className={cn({ 'opacity-50': disabled })}>
        <FormLabel>
          {title}
          {required && <RequiredAsterisk />}
        </FormLabel>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
      {children}
    </FormItem>
  );
}

export function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <Button type='submit' className='flex items-center gap-2' disabled={disabled}>
      {disabled && <LoaderIcon className='animate-spin' size={16} />}
      変更を保存
    </Button>
  );
}

export function RequiredAsterisk() {
  return <span className='ml-1 text-red-500'>*</span>;
}
