import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CircleCheck, CircleX, LoaderCircle } from 'lucide-react';

export const PendingStateLoader = ({ message }) => (
  <motion.div
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.8 }}
    className='rounded-lg bg-white p-8 shadow-lg flex flex-col items-center justify-center w-full max-w-80'
  >
    <LoaderCircle className='text-primary h-5 w-5 md:h-8 md:w-8 animate-spin' />
    <p className='mt-4 text-center text-sm md:text-base font-medium'>
      {message ?? 'Loading...'}
    </p>
  </motion.div>
);

export const FullfilledStateLoader = ({ title, message, type }) => (
  <motion.div
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.8 }}
    className='rounded-lg bg-white p-8 text-center shadow-lg dark:bg-surface-dark w-full max-w-80'
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 10,
      }}
    >
      {type === 'success' ? (
        <CircleCheck className='mx-auto h-8 w-8 text-primary' />
      ) : (
        <CircleX className='mx-auto h-8 w-8 text-red-400' />
      )}
    </motion.div>
    {title ? <p className='mt-4 text-lg font-medium'>{title}</p> : null}
    <p
      className={cn(
        'mt-2 text-sm md:text-base',
        type === 'success' ? 'text-primary' : 'text-red-400'
      )}
    >
      {message ?? 'Completed'}
    </p>
  </motion.div>
);
