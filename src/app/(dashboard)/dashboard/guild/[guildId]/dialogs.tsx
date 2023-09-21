'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { FC } from 'react';

type confirmDialogProps = {
  title?: string;
  content: React.ReactNode;
  children: React.ReactNode;
};

export const ConfirmDialog: FC<confirmDialogProps> = ({ title = '確認', content, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{content}</div>
        <div className='flex justify-end gap-3'>
          <Button>はい</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
