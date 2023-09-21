import * as SelectPrimitive from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { FC } from 'react';
import { FormControl } from '@/components/ui/form';
import { zeroPadding } from '@/lib/utils';

type ChannelSelectProps = {
  channels: APIChannel[];
  types: ChannelType[];
  isShowCategoryName?: boolean;
  triggerClassName?: string;
} & SelectPrimitive.SelectProps;

export const ChannelSelect: FC<ChannelSelectProps> = ({
  channels,
  types,
  isShowCategoryName,
  triggerClassName = 'w-[300px]',
  ...props
}) => {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder='チャンネルを選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {channels
          .filter((ch) => types.includes(ch.type))
          .map((ch) => (
            <SelectItem key={ch.id} value={ch.id}>
              {ch.name}
              {isShowCategoryName &&
                (ch.type == ChannelType.GuildText || ch.type == ChannelType.GuildVoice) && (
                  <span className='ml-2 text-xs font-bold text-muted-foreground'>
                    {channels.find((c) => c.id == ch.parent_id)?.name}
                  </span>
                )}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

type RoleSelectProps = {
  roles: APIRole[];
  isHideLinkedRole?: boolean;
  isHideEveryoneRole?: boolean;
} & SelectPrimitive.SelectProps;

export const RoleSelect: FC<RoleSelectProps> = ({
  roles,
  isHideLinkedRole,
  isHideEveryoneRole,
  ...props
}) => {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='ロールを選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {roles
          .filter(
            (role) =>
              !((isHideLinkedRole && role.managed) || (isHideEveryoneRole && role.position === 0)),
          )
          .sort((a, b) => (a.position < b.position ? 1 : -1))
          .map((role) => (
            <SelectItem key={role.id} value={role.id}>
              <span style={{ color: `#${role.color.toString(16)}` }}>{role.name}</span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

type HourSelectProps = SelectPrimitive.SelectProps;

export const HourSelect: FC<HourSelectProps> = ({ ...props }) => {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {Array(24)
          .fill(0)
          .map((v, index) => (
            <SelectItem key={index} value={String(index)}>
              {zeroPadding(index, 2)}:00
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
