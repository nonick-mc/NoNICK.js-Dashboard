'use client';

import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

type FormItemLayoutProps = {
  title: string;
  description?: string;
  layout?: 'row' | 'col';
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
};

export const FormItemLayout: FC<FormItemLayoutProps> = ({
  title,
  description,
  disabled,
  required,
  children,
  layout = 'row',
}) => {
  return (
    <FormItem
      className={cn(
        'flex space-y-0',
        { 'flex-col justify-start gap-2': layout === 'col' },
        { 'items-center justify-between': layout === 'row' },
      )}
    >
      <div>
        <FormLabel className={cn({ 'opacity-50': disabled })}>
          {title}
          {required && <RequiredAsterisk />}
        </FormLabel>
        {description && (
          <FormDescription className={cn({ 'opacity-50': disabled })}>
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </div>
      {children}
    </FormItem>
  );
};

export const SubmitButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <Button type='submit' className='flex items-center gap-2' disabled={disabled}>
      {disabled && <AiOutlineLoading3Quarters className='animate-spin' size={16} />}
      変更を保存
    </Button>
  );
};

export const RequiredAsterisk: FC = () => {
  return <span className='ml-1 text-red-500'>*</span>;
};
