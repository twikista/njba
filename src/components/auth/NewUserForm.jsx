'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { signup } from '@/lib/actions/auth';
import { newUserSchema } from '@/lib/schemas/auth';
import Select from '@/components/inputs/Select';
import TextInput from '@/components/shared/TextInput';
import FormWrapper from '@/components/forms/FormWrapper';
import SubmitButton from '@/components/buttons/SubmitButton';
import CancelButton from '@/components/buttons/CancelButton';
import { toast } from 'sonner';
import { set } from 'mongoose';
import { Modal } from '../shared/Modal';
import { FullfilledStateLoader, PendingStateLoader } from '../shared/Loader';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
// import Form from '../Dashboard/Form';

const ROLE_TYPES = [
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
];

export default function NewUserForm() {
  const initialVlaue = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };

  const [errorFromServer, setErrorFromServer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();
  const methods = useForm({
    defaultValues: initialVlaue,
    resolver: zodResolver(newUserSchema),
  });

  const handleSuccess = () => {
    setIsLoading(false);
    setIsSuccessful(true);
    methods.reset();
    toast.success('User created successfully! 👍🏼');
    router.push('/dashboard/users');
    const timeoutId = setTimeout(() => {
      setIsSuccessful(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  const handleError = (response) => {
    toast.error('User creation unsuccessful! ');

    if (response?.errorType === 'validationError') {
      const formfields = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        role: 'role',
      };
      handleValidationErrorFromServer(response, formfields, setError);
      setIsLoading(false);
    } else if (response?.errorType === 'other') {
      // setErrorFromServer(response.error);
      setErrorFromServer(response.error);
      const timeoutId = setTimeout(() => {
        setErrorFromServer('');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }

    setIsLoading(false);
  };
  const submitHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await signup(data);

      if (response?.ok) {
        handleSuccess();
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorFromServer('An unexpected error occurred. Please try again.');
      setIsLoading(false);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=''>
      <FormWrapper formHeading='Add New User'>
        {errorFromServer && (
          <div>
            <span>{errorFromServer}</span>
          </div>
        )}

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(submitHandler)}
            className='flex flex-col gap-4'
          >
            <Select
              name='role'
              label='Role Type'
              placeholder='select issue type'
              options={ROLE_TYPES}
            />
            <TextInput
              label='First name'
              name='firstName'
              placeholder='Enter first Name'
            />

            <TextInput
              label='Last name'
              name='lastName'
              placeholder='Enter last name'
            />
            <TextInput label='E-mail' name='email' placeholder='Enter email' />

            <div className='flex justify-end gap-2 pt-1'>
              <CancelButton text='Cancel' />
              <SubmitButton
                textColor='white'
                bgColor='901090'
                hoverBgColor='800080'
                mainText='Add User'
                altText='Creating user...'
                formSubmitState={methods.formStateisSubmitting}
              />
            </div>
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
