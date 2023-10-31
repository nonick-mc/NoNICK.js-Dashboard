import * as SelectPrimitive from '@radix-ui/react-select';
import { FormControl } from '@/components/ui/form';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ChannelSelectProps = {
  channels: APIChannel[];
  filter?: (channel: APIChannel) => boolean;
  triggerClassName?: string;
} & SelectPrimitive.SelectProps;

export function ChannelSelect({
  channels,
  filter,
  triggerClassName,
  ...props
}: ChannelSelectProps) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder='チャンネルを選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {channels
          .filter((channel) => (filter ? filter(channel) : true))
          .map((ch) => (
            <SelectItem key={ch.id} value={ch.id}>
              {ch.name}
              {(ch.type == ChannelType.GuildText || ch.type == ChannelType.GuildVoice) && (
                <span className='ml-2 text-xs font-bold text-muted-foreground'>
                  {channels.find((c) => c.id == ch.parent_id)?.name}
                </span>
              )}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

type RoleSelectProps = {
  roles: APIRole[];
  filter?: (role: APIRole) => boolean;
  triggerClassName?: string;
} & SelectPrimitive.SelectProps;

export function RoleSelect({ roles, filter, triggerClassName, ...props }: RoleSelectProps) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder='ロールを選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {roles
          .filter((role) => (filter ? filter(role) : true))
          .sort((a, b) => (a.position < b.position ? 1 : -1))
          .map((role) => (
            <SelectItem key={role.id} value={role.id}>
              <span style={{ color: `#${role.color.toString(16)}` }}>{role.name}</span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

type NumberSelectProps = {
  length: number;
  filter?: (value: number) => boolean;
  format?: (value: number) => string;
  triggerClassName?: string;
} & SelectPrimitive.SelectProps;

export function NumberSelect({ length, format, triggerClassName, ...props }: NumberSelectProps) {
  return (
    <Select {...props}>
      <FormControl>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder='選択' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='max-h-[250px]'>
        {Array(length)
          .fill(0)
          .map((v, index) => (
            <SelectItem key={index} value={String(index)}>
              {format ? format(index) : index}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
