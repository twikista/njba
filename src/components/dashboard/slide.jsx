'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = ['published', 'Draft'];

export const ChipTabs = ({ status, handler }) => {
  const selected = status === 'published' || status === 'undefined';
  return (
    <div className='p-1.5 bg-primary flex items-center flex-wrap gap-2 w-fit rounded-lg'>
      <Chip tab='published' selected={selected} setSelected={handler} />
      <Chip tab='draft' selected={selected} setSelected={handler} />
    </div>
  );
};

const Chip = ({ tab, selected, setSelected, className }) => {
  console.log(selected);
  return (
    <button
      onClick={() => setSelected(tab)}
      className={cn(
        'text-sm transition-colors px-3 rounded-lg relative',
        selected ? 'text-white' : 'text-slate-300',
        className
      )}
    >
      <span className='relative z-10'>{tab}</span>
      {selected && (
        <motion.span
          layoutId='pill-tab'
          transition={{ type: 'spring', duration: 0.5 }}
          className='absolute inset-0 z-0 bg-[#f8fbf8]/20 rounded-md'
        ></motion.span>
      )}
    </button>
  );
};

function ResourceFilter({ status }) {
  console.log(status);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handler = (searchTerm) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', searchTerm);
    replace(`${pathName}?${params.toString()}`);
  };

  //   return (
  //     <div className='flex items-center self-end'>
  //       {/* <div>Filter:</div> */}
  //       <div className='flex w-[160px] text-xs  items-center overflow-hidden border-2 justify-evenly border-secondary rounded-xl md:w-[160px]'>
  //         <button
  //           onClick={() => {
  //             handler('published');
  //           }}
  //           className={cn(
  //             'flex-1 flex justify-center w-6/12 py-1 px-1 text-primary transition-all duration-300 hover:text-hover',

  //             status === 'published' || status === 'undefined'
  //               ? 'text-white bg-secondary hover:text-white'
  //               : null
  //           )}
  //         >
  //           Published
  //         </button>
  //         {/* <div className='mx-[3px] '>|</div> */}
  //         <button
  //           onClick={() => {
  //             handler('draft');
  //           }}
  //           className={cn(
  //             'flex-1 flex py-1 px-1 w-6/12 justify-center text-primary transition-all duration-300 hover:text-hover',
  //             status === 'draft' && 'text-white bg-secondary hover:text-white'
  //           )}
  //         >
  //           Unpublished
  //         </button>
  //       </div>
  //     </div>
  //   );
  return <ChipTabs status={status} handler={handler} />;
}

export default ResourceFilter;
