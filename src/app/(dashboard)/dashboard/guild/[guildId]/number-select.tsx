'use client';

import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { FormSelectClassNames } from './form-utils';

type Props = {
  length: number;
  filter?: (value: number) => boolean;
  textFormat?: (value: number) => string;
  selectionMode?: keyof typeof FormSelectClassNames;
} & Omit<SelectProps, 'children' | 'selectionMode'>;

export function NumberSelect({
  classNames,
  length,
  textFormat,
  placeholder = '選択',
  selectionMode = 'single',
  isRequired,
  ...props
}: Props) {
  return (
    <Select
      classNames={classNames ?? FormSelectClassNames[selectionMode]}
      variant='bordered'
      placeholder={placeholder}
      selectionMode={selectionMode}
      isMultiline={selectionMode === 'multiple'}
      isRequired={isRequired}
      disallowEmptySelection={isRequired}
      {...props}
    >
      {Array.from({ length }, (_, i) => i).map((v) => (
        <SelectItem key={v} value={String(v)}>
          {textFormat ? textFormat(v) : v}
        </SelectItem>
      ))}
    </Select>
  );
}
