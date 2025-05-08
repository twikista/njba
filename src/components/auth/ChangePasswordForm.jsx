'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { changePassword, logOut } from '@/lib/actions/auth';
import { changePasswordFormSchema } from '@/lib/schemas/auth';
import { motion } from 'framer-motion';
import PasswordInput from '@/components/inputs/PasswordInput';
import { handleValidationErrorFromServer } from '@/lib/helper';
import FormWrapper from '../forms/FormWrapper';
import SubmitButton from '../buttons/SubmitButton';
import { AnimatePresence } from 'framer-motion';
import { FullfilledStateLoader, PendingStateLoader } from '../shared/Loader';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function changePasswordForm({ email }) {
  const router = useRouter();
  const [errorFromServer, setErrorFromServer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const methods = useForm({
    defaultValues: {
      existingPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(changePasswordFormSchema),
  });
  const handler = async (data) => {
    // setIsLoading(true);
    console.log(data);
    const response = await changePassword(email, data);
    if (response && response.ok) {
      //   setIsLoading(false);
      //   setIsSuccessful(true);
      toast.success('Password changed successfully! 👍🏼');
      await logOut();
      //   const timeoutId = setTimeout(() => {
      //     setIsSuccessful(false);
      //   }, 5000);
      //   return () => clearTimeout(timeoutId);
    }

    if (response && !response?.ok) {
      if (response?.errorType === 'validationError') {
        toast.error(response.error);
        const formfields = {
          firstName: 'existingPassword',
          lastName: 'newPassword',
        };

        handleValidationErrorFromServer(response, formfields, setError);
        // setIsLoading(false);
      }
    }

    if (response?.errorType === 'other') {
      toast.error(response.error);
      // setErrorFromServer(response.error);
      // const timeoutId = setTimeout(() => {
      //   setErrorFromServer('');
      // }, 4000);
      // return () => clearTimeout(timeoutId);
    }
    // setIsLoading(false);
  };
  return (
    <div className=' flex '>
      <FormWrapper formHeading='Change Password' className='max-w-[520px]'>
        {errorFromServer && (
          <div className='text-center'>
            <span
              className={cn(
                'text-sm text-red-400 transition-all duration-200',
                errorFromServer ? 'inline-block' : 'hidden'
              )}
            >
              {errorFromServer}
            </span>
          </div>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handler)}
            className='space-y-4 flex flex-col pb-5'
          >
            <PasswordInput
              name='existingPassword'
              label='Curent Password'
              placeholder='Enter your current password'
            />
            <PasswordInput
              name='newPassword'
              label='Password'
              placeholder='Enter your new password'
            />
            <SubmitButton
              mainText='Change password'
              altText='Changing password...'
              isSubmitting={methods.formState.isSubmitting}
              className='md:w-full py-2.5 hover:bg-hover '
            />
          </form>
        </FormProvider>
      </FormWrapper>
      {/* {isLoading && (
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
      )} */}
    </div>
  );
}

export default changePasswordForm;
