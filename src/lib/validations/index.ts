import * as z from 'zod';

export const urlSchema = z.string().regex(/(https?:\/\/[^\s]+)/, '有効なURLを入力してください');