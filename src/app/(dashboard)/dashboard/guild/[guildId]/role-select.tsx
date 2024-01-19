'use client';

import { Chip } from '@nextui-org/chip';
import {
  Select,
  SelectItem,
  SelectProps,
  SelectedItems,
} from '@nextui-org/select';
import { APIRole } from 'discord-api-types/v10';
import { Key } from 'react';
import { FormSelectClassNames } from './form-utils';

export type Props = {
  roles: APIRole[];
  filter?: (role: APIRole) => boolean;
  selectionMode?: keyof typeof FormSelectClassNames;
} & Omit<
  SelectProps,
  'children' | 'renderValue' | 'items' | 'placeholder' | 'selectionMode'
>;

export function RoleSelect({
  classNames,
  roles,
  filter,
  selectionMode = 'single',
  ...props
}: Props) {
  const sortedRoles = roles
    .filter((role) => (filter ? filter(role) : true))
    .sort((a, b) => (a.position < b.position ? 1 : -1));

  function renderValue(items: SelectedItems<APIRole>) {
    return (
      <div className='flex flex-wrap gap-1'>
        {items.map((item) =>
          selectionMode === 'multiple' ? (
            <MultipleSelectItem role={item.data} key={item.key} />
          ) : (
            <SingleSelectItem role={item.data} key={item.key} />
          ),
        )}
      </div>
    );
  }

  return (
    <Select
      classNames={classNames ?? FormSelectClassNames[selectionMode]}
      items={sortedRoles}
      variant='bordered'
      placeholder='ロールを選択'
      selectionMode={selectionMode ?? 'single'}
      renderValue={renderValue}
      {...props}
    >
      {(role) => (
        <SelectItem key={role.id} value={role.id} textValue={role.name}>
          <SingleSelectItem role={role} />
        </SelectItem>
      )}
    </Select>
  );
}

export function SingleSelectItem({
  role,
  key,
}: { role?: APIRole | null; key?: Key }) {
  return (
    <div className='flex items-center gap-2' key={key}>
      <div className='flex size-[18px] items-center justify-center'>
        <div
          className='h-2 w-2 rounded-full'
          style={{
            backgroundColor: role?.color
              ? `#${role.color.toString(16)}`
              : 'GrayText',
          }}
        />
      </div>
      <span className='text-foreground'>{role?.name}</span>
    </div>
  );
}

export function MultipleSelectItem({
  role,
  key,
}: { role?: APIRole | null; key?: Key }) {
  return <Chip key={key}>{role?.name}</Chip>;
}
