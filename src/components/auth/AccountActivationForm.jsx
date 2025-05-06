'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { activateUser } from '@/lib/actions/auth';
import { activateAccountSchema } from '@/lib/schemas/auth';
import { motion } from 'framer-motion';
import PasswordInput from '@/components/inputs/PasswordInput';
import { handleValidationErrorFromServer } from '@/lib/helper';
import FormWrapper from '../forms/FormWrapper';
import SubmitButton from '../buttons/SubmitButton';
import { AnimatePresence } from 'framer-motion';
import { FullfilledStateLoader, PendingStateLoader } from '../shared/Loader';

function AccountActivationForm({ id }) {
  const router = useRouter();
  const [errorFromServer, setErrorFromServer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const methods = useForm({
    defaultValues: {
      defaultPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(activateAccountSchema),
  });
  const handler = async (data) => {
    setIsLoading(true);
    console.log(data);
    const response = await activateUser(id, data);
    if (response && response.ok) {
      setIsLoading(false);
      setIsSuccessful(true);
      toast.success('User created successfully! 👍🏼');
      router.push('/auth/login');
      const timeoutId = setTimeout(() => {
        setIsSuccessful(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }

    if (response && !response?.ok) {
      if (response?.errorType === 'validationError') {
        const formfields = {
          firstName: 'defaultPassword',
          lastName: 'newPassword',
        };

        handleValidationErrorFromServer(response, formfields, setError);
        setIsLoading(false);
      }
    }

    if (response?.errorType === 'other') {
      setErrorFromServer(response.error);
      const timeoutId = setTimeout(() => {
        setErrorFromServer('');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <FormWrapper formHeading='Account Activation'>
        {errorFromServer && (
          <div>
            <span>{errorFromServer}</span>
          </div>
        )}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handler)} className='space-y-4'>
            <PasswordInput
              name='defaultPassword'
              label='Password'
              placeholder='Enter your current password'
            />
            <PasswordInput
              name='newPassword'
              label='Password'
              placeholder='Enter your new password'
            />
            <SubmitButton
              mainText='Activiate account'
              altText='Activating account...'
              isSubmitting={methods.formState.isSubmitting}
              className='md:w-full py-2.5 hover:bg-hover '
            />
          </form>
        </FormProvider>
      </FormWrapper>
      {isLoading && (
        <AnimatePresence>
          <motion.div
            key='modal'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn(
              'fixed inset-0 z-[1000] overflow-scroll bg-neutral-900/70 px-2  py-10 dark:backdrop-blur-[1px] sm:px-5 flex items-center justify-center'
            )}
          >
            <PendingStateLoader message='Creating user...' />
          </motion.div>
        </AnimatePresence>
      )}
      {isSuccessful && (
        <AnimatePresence>
          <motion.div
            key='modal'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn(
              'fixed inset-0 z-[1000] overflow-scroll bg-neutral-900/70 px-2  py-10 dark:backdrop-blur-[1px] sm:px-5 flex items-center justify-center'
            )}
          >
            <FullfilledStateLoader
              message='User created successfully'
              type={'success'}
            />
          </motion.div>
        </AnimatePresence>
      )}
      {errorFromServer && (
        <AnimatePresence>
          <motion.div
            key='modal'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn(
              'fixed inset-0 z-[1000] overflow-scroll bg-neutral-900/70 px-2  py-10 dark:backdrop-blur-[1px] sm:px-5 flex items-center justify-center'
            )}
          >
            <FullfilledStateLoader
              message='User creation unsuccessful'
              type={'error'}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default AccountActivationForm;
