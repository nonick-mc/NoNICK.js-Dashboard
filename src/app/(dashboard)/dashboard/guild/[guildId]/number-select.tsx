import { Select, SelectItem, SelectProps } from '@nextui-org/react';

type Props = {
  length: number;
  filter?: (value: number) => boolean;
  textFormat?: (value: number) => string;
} & Omit<SelectProps, 'children'>;

export function NumberSelect({
  length,
  textFormat,
  placeholder = '選択',
  ...props
}: Props) {
  return (
    <Select variant='bordered' placeholder={placeholder} {...props}>
      {Array.from({ length }, (_, i) => i).map((v) => (
        <SelectItem key={v} value={String(v)}>
          {textFormat ? textFormat(v) : v}
        </SelectItem>
      ))}
    </Select>
  );
}
