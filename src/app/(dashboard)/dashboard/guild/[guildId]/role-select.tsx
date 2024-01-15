'use client';

import { Chip } from '@nextui-org/chip';
import {
  Select,
  SelectItem,
  SelectProps,
  SelectedItems,
} from '@nextui-org/select';
import { APIRole } from 'discord-api-types/v10';

export type Props = {
  roles: APIRole[];
  filter?: (role: APIRole) => boolean;
} & Omit<SelectProps, 'children' | 'renderValue' | 'items' | 'placeholder'>;

export function RoleSelect({ roles, filter, selectionMode, ...props }: Props) {
  return (
    <Select
      items={roles
        .filter((role) => (filter ? filter(role) : true))
        .sort((a, b) => (a.position < b.position ? 1 : -1))}
      variant='bordered'
      placeholder='ロールを選択'
      selectionMode={selectionMode ?? 'single'}
      renderValue={(items: SelectedItems<APIRole>) => (
        <div className='flex flex-wrap gap-1'>
          {items.map((item) =>
            selectionMode === 'multiple' ? (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ) : (
              <div className='flex items-center gap-1' key={item.key}>
                <div className='flex h-[18px] w-[18px] items-center justify-center'>
                  <div
                    className='h-2 w-2 rounded-full'
                    style={{
                      backgroundColor: item.data?.color
                        ? `#${item.data.color.toString(16)}`
                        : 'GrayText',
                    }}
                  />
                </div>
                <span className='text-foreground'>{item.data?.name}</span>
              </div>
            ),
          )}
        </div>
      )}
      {...props}
    >
      {(role) => (
        <SelectItem key={role.id} value={role.id} textValue={role.name}>
          <div className='flex items-center gap-2'>
            <div className='flex size-[18px] items-center justify-center'>
              <div
                className='h-2 w-2 rounded-full'
                style={{
                  backgroundColor: role.color
                    ? `#${role.color.toString(16)}`
                    : 'GrayText',
                }}
              />
            </div>
            <span className='text-foreground'>{role.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
