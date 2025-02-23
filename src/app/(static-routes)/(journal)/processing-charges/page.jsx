import React from 'react';
import Main from '@/components/shared/Main';
import { H1, H2, H3 } from '@/components/shared/headings';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';

export default function AuthorsGude() {
  return (
    <Main className='text-black'>
      <H1>Article Processing Charge</H1>
      <div>
        <p className='font-semibold'>
          The following processing charge applies to articles submitted to NJBA:
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8 max-w-3xl'>
          <li>
            <TextBlockWithHeading
              className='px-0'
              headingText='Local Authors'
              text='Manuscripts must be accompanied with a non-refundable review fee of ₦8,000. Upon acceptance, a publication fee of ₦25,000 is expected.'
            />
          </li>
          <li>
            {' '}
            <TextBlockWithHeading
              className='px-0'
              headingText='International Authors'
              text='Manuscripts must be accompanied with a non-refundable review fee of $10. Upon acceptance, a publication fee of $50 is expected.'
            />
          </li>
        </ul>
      </div>
      <div>
        <p className='mb-1'>Payments should be made directly to:</p>
        <span className='block'>
          Bank:{' '}
          <span className='font-semibold'>United Bank for Africa (UBA)</span>
        </span>
        <span className='block'>
          Account Number: <span className='font-semibold'>1022158418</span>
        </span>
        <span className='block'>
          Account Name:{' '}
          <span className='font-semibold'>Dept. of Business Admin</span>
        </span>
      </div>
    </Main>
  );
}
