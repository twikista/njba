'use client';
import React, { useState } from 'react';
import TextArea from '@/components/inputs/Textarea';
import FileInput from '@/components/inputs/FileInput';

export default function StepThree({ hasInitialValue }) {
  return (
    <div className='space-y-4'>
      <TextArea
        label='Abstract'
        name='abstract'
        placeholder='Enter article abstract'
      />
      <FileInput hasInitialValue={hasInitialValue} />
    </div>
  );
}
