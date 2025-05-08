// 'use client';
import { generateAPAReference } from '@/lib/helper';
import React from 'react';
import { BiCopy } from 'react-icons/bi';
import { PiChatTeardropTextBold } from 'react-icons/pi';
import { PiBookOpenTextBold } from 'react-icons/pi';
import CopyTextButton from './CopyTextButton';

export default function APAReference({ article, issue }) {
  const reference = generateAPAReference(article, issue);
  const markup = { __html: reference.markup || '' };

  return (
    <div className='space-y-1'>
      <h2 className='font-semibold flex items-center gap-1'>How to cite</h2>
      <div className='space-y-2'>
        <p dangerouslySetInnerHTML={markup} className='text-wrap text' />
        <CopyTextButton textToCopy={reference.text} />
      </div>
    </div>
  );
}
