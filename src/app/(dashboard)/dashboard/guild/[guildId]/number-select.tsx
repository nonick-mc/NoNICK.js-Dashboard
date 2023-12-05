import { Select, SelectItem, SelectProps } from '@nextui-org/react';

type Props = {
  length: number;
  filter?: (value: number) => boolean;
  textFormat?: (value: number) => string;
} & Omit<SelectProps, 'children'>;

export function NumberSelect({
  length,
  textFormat,
  placeholder,
  ...props
}: Props) {
  return (
    <Select variant='bordered' placeholder={placeholder || '選択'} {...props}>
      {Array(length)
        .fill(0)
        .map((v, index) => (
          <SelectItem key={index} value={String(index)}>
            {textFormat ? textFormat(index) : index}
          </SelectItem>
        ))}
    </Select>
  );
}
