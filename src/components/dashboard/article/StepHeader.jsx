import { H3 } from '@/components/shared/headings';
import React from 'react';

export default function StepHeader({ currentStep, steps }) {
  return (
    <div className='flex justify-center px-4 py-2 text-neutral-600 bg-[#d4e499] border border-gray-200 rounded-md'>
      <H3 className='mx-auto font-semibold w-fit'>
        <span>{`Step ${currentStep} - `}</span>{' '}
        <span>{steps[currentStep - 1].label}</span>
      </H3>
    </div>
  );
}
