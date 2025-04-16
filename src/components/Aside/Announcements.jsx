import React from 'react';
import { H2, H3 } from '../shared/headings';

export default function Announcement() {
  return (
    <div className='h-fit'>
      <H3 className='capitalize text-primary'>Announcements</H3>
      <p className='text-gray-400 text-sm'>No announcements</p>
    </div>
  );
}
