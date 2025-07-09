'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = ['published', 'Draft'];

export const ChipTabs = ({ status, handler }) => {
  // const selected = status === 'published' || status === 'undefined';
  return (
    <div className='p-1.5 bg-primary flex items-center flex-wrap gap-2 w-fit rounded-lg'>
      <Chip tab='published' setFilter={handler} />
      <Chip tab='draft' setFilter={handler} status />
    </div>
  );
};

const Chip = ({ tab, status, setFilter, className }) => {
  return (
    <div>
      <button
        onClick={() => setFilter(tab)}
        className={cn(
          'text-sm transition-colors px-3 rounded-lg relative',
          status === tab ? 'text-white' : 'text-slate-300',
          className
        )}
      >
        <span className='relative z-10'>{tab}</span>
        {status === tab && (
          <motion.span
            layoutId='pill-tab'
            transition={{ type: 'spring', duration: 0.5 }}
            className='absolute inset-0 z-0 bg-[#f8fbf8]/20 rounded-md'
          ></motion.span>
        )}
      </button>
      <button
        onClick={() => setFilter(tab)}
        className={cn(
          'text-sm transition-colors px-3 rounded-lg relative',
          status === tab ? 'text-white' : 'text-slate-300',
          className
        )}
      >
        <span className='relative z-10'>{tab}</span>
        {status === tab && (
          <motion.span
            layoutId='pill-tab'
            transition={{ type: 'spring', duration: 0.5 }}
            className='absolute inset-0 z-0 bg-[#f8fbf8]/20 rounded-md'
          ></motion.span>
        )}
      </button>
    </div>
  );
};

function ResourceFilter() {
  // console.log(status);
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  // const router = useRouter();
  const { replace } = useRouter();

  const handler = (filterParam) => {
    const params = new URLSearchParams(searchParams);
    filterParam ? params.set('status', filterParam) : params.delete('status');
    replace(`?${params.toString()}`);
  };

  return (
    <div className='p-1.5 bg-primary flex items-center gap-2 w-fit rounded-lg'>
      <button
        onClick={() => handler('published')}
        className={cn(
          'text-sm transition-colors px-3 rounded-lg relative',
          status === 'published' || status === null
            ? 'text-white font-medium'
            : 'text-slate-200'
        )}
      >
        <span className='relative z-10'>Published</span>
        {(status === 'published' || status === null) && (
          <motion.span
            layoutId='pill-tab'
            transition={{ type: 'spring', duration: 0.5 }}
            className='absolute inset-0 z-0 bg-[#f8fbf8]/20 rounded-md'
          ></motion.span>
        )}
      </button>
      <button
        onClick={() => handler('draft')}
        className={cn(
          'text-sm transition-colors px-3 rounded-lg relative',
          status === 'draft' ? 'text-white font-medium' : 'text-slate-200'
        )}
      >
        <span className='relative z-10'>Draft</span>
        {status === 'draft' && (
          <motion.span
            layoutId='pill-tab'
            transition={{ type: 'spring', duration: 0.5 }}
            className='absolute inset-0 z-0 bg-[#f8fbf8]/20 rounded-md'
          ></motion.span>
        )}
      </button>
    </div>
  );
}

export default ResourceFilter;
