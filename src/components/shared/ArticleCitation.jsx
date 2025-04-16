import { generateAPAReference } from '@/lib/helper';
import React from 'react';
import { PiChatTeardropTextBold } from 'react-icons/pi';
import { PiBookOpenTextBold } from 'react-icons/pi';

export default function APAReference({ article, issue }) {
  const reference = generateAPAReference(article, issue);
  const markup = { __html: reference || '' };

  return (
    <div className='space-y-1'>
      <h2 className='font-semibold flex items-center gap-1'>How to cite</h2>
      <p dangerouslySetInnerHTML={markup} className='text-wrap text-sm' />
    </div>
  );
}
