'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Spinner from '../shared/Spinner';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import { toast } from 'sonner';

export default function DeleteButton({
  action,
  id,
  variant = 'primary',
  label = 'Delete',
  altLabel,
  successMessage = 'Issue deleted successfully!',
  errorMessage = 'Something went wrong. Try again.',
  className,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handler = async (id) => {
    setIsLoading(true);
    const response = await action(id);
    if (response?.ok) {
      setIsLoading(false);
      toast.success(successMessage);
    } else {
      setIsLoading(false);
      toast.success(errorMessage);
    }
  };

  if (variant === 'primary') {
    return (
      <button
        type='button'
        disabled={isLoading}
        onClick={() => handler(id)}
        className={cn(
          'shadow-md flex gap-1 btn btn-danger',
          isLoading && 'pointer-events-none text-gray-500 bg-gray-200',
          className
        )}
      >
        {variant === 'primary' && (
          <>
            <span className='capitalize'>{isLoading ? altLabel : label}</span>
            {isLoading ? (
              <Spinner variant='basic' />
            ) : (
              <HiOutlineTrash className='size-5' />
            )}
          </>
        )}
      </button>
    );
  } else {
    return (
      <button
        type='button'
        disabled={isLoading}
        onClick={() => handler(id)}
        className={cn(
          'text-primary hover:text-red-500',
          isLoading && 'pointer-events-none text-gray-400'
        )}
        data-tooltip-id='delete'
        data-tooltip-content='Delete!'
        data-tooltip-place='top'
      >
        {isLoading ? (
          <Spinner variant='basic' />
        ) : (
          <HiOutlineTrash className='size-6' />
        )}
        <Tooltip id='delete' />
      </button>
    );
  }
}
