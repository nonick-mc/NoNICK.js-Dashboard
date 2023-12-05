'use client';

import { formatNumber } from '@/lib/utils';
import { FC } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const sampleData = [
  { date: '6/19', messages: 32942, newbie: 20 },
  { date: '6/26', messages: 14498, newbie: 20 },
  { date: '7/3', messages: 21932, newbie: 20 },
  { date: '7/10', messages: 16746, newbie: 20 },
  { date: '7/17', messages: 22684, newbie: 20 },
  { date: '7/24', messages: 27611, newbie: 20 },
  { date: '7/31', messages: 26227, newbie: 20 },
  { date: '8/7', messages: 36149, newbie: 20 },
  { date: '8/14', messages: 30637, newbie: 20 },
  { date: '8/21', messages: 17796, newbie: 20 },
];

export const MessageActivityGraph: FC = () => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        width={730}
        height={250}
        data={sampleData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id='colorMessages' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          height={20}
          dataKey='date'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          width={30}
          fontSize={12}
          tickFormatter={(value) => formatNumber(value)}
          tickLine={false}
          axisLine={false}
          padding={{ bottom: 0 }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className='box-border rounded-lg bg-content1 px-4 py-2 shadow-medium'>
                  <div className='flex flex-col'>
                    <span className='text-muted-foreground text-[0.70rem] uppercase'>
                      メッセージ数
                    </span>
                    <span className='font-bold'>{payload[0].value}</span>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Area
          type='monotone'
          dataKey='messages'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorMessages)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
