'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueFormSchema } from '@/lib/schemas/issues';
import { createIssue, updateIssue } from '@/lib/actions/issues';
import { TextInput } from '@/components/inputs/TextInput';
import { handleValidationErrorFromServer } from '@/lib/helper';
import SubmitButton from '@/components/buttons/SubmitButton';
import CancelButton from '@/components/buttons/CancelButton';
import FormWrapper from '../FormWrapper';
import { toast } from 'sonner';
import Select from '@/components/inputs/Select';
import { Modal } from '@/components/shared/Modal';
import {
  FullfilledStateLoader,
  PendingStateLoader,
} from '@/components/shared/Loader';

const ISSUE_TYPES = [
  { value: 'regular-issue', label: 'Regular Issue' },
  { value: 'special-issue', label: 'Special Issue' },
];

export default function IssueForm({ initialFormState }) {
  const [errorFromServer, setErrorFromServer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();

  const methods = useForm({
    defaultValues: initialFormState,
    resolver: zodResolver(IssueFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  const { handleSubmit, reset, setError, control } = methods;

  // Watch the issueType field to conditionally render the theme input
  const issueType = useWatch({
    control,
    name: 'issueType',
    defaultValue: initialFormState?.issueType || 'regular-issue',
  });

  const isSpecialIssue = issueType === 'special-issue';

  // No useCallback needed since this is only used in onSubmit
  const handleSuccess = () => {
    setIsLoading(false);
    setIsSuccessful(true);
    reset();
    toast.success(
      initialFormState?.issueNumber
        ? 'Issue updated successfully! 👍🏼'
        : 'Issue created successfully! 👍🏼'
    );
    router.push('/dashboard/issues?status=draft');
    const timeoutId = setTimeout(() => {
      setIsSuccessful(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  // No useCallback needed since this is only used in onSubmit
  const handleError = (response) => {
    toast.error('Issue creation unsuccessful! ');

    if (response?.errorType === 'validationError') {
      const formfields = {
        volume: 'volume',
        issueNumber: 'issueNumber',
        issueYear: 'issueYear',
        issueTheme: 'issueTheme',
        issueType: 'issueType',
      };
      handleValidationErrorFromServer(response, formfields, setError);
    } else if (response?.errorType === 'other') {
      setErrorFromServer(response.error);
      setErrorFromServer(response.error);
      const timeoutId = setTimeout(() => {
        setErrorFromServer('');
      }, 4000);
      return () => clearTimeout(timeoutId);
    }

    setIsLoading(false);
  };
  console.log('id:', initialFormState.id);
  // No useCallback needed since this is only used in the form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('data:', data);

    try {
      const isCreating = initialFormState?.issueNumber === '';
      const response = isCreating
        ? await createIssue(data)
        : await updateIssue(initialFormState.id, data);

      if (response.ok) {
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

  // Reset the theme field when changing from special issue to regular issue
  useEffect(() => {
    if (!isSpecialIssue) {
      methods.setValue('theme', '', { shouldValidate: false });
    }
  }, [isSpecialIssue, methods]);

  const isUpdateMode = !!initialFormState?.id;
  const formHeading = isUpdateMode ? 'Update Issue' : 'Add New Issue';
  const submitButtonText = isUpdateMode ? 'Update Issue' : 'Create Issue';

  return (
    <div>
      <FormWrapper formHeading={formHeading}>
        {/* {errorFromServer && (
          <div className='p-3 text-red-400 bg-red-100 rounded-md mb-4'>
            <span>{errorFromServer}</span>
          </div>
        )} */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Select
              name='issueType'
              label='Issue Type'
              placeholder='select issue type'
              options={ISSUE_TYPES}
            />

            {isSpecialIssue && (
              <TextInput
                label='Issue Theme'
                name='issueTheme'
                placeholder='Enter the special issue theme'
                // required={isSpecialIssue}
              />
            )}

            <TextInput
              label='volume number'
              name='volume'
              placeholder='Enter Volume number'
            />
            <TextInput
              label='issue number'
              name='issueNumber'
              placeholder='Enter issue number'
            />
            <TextInput
              type='number'
              label='Issue Year'
              name='issueYear'
              placeholder='Enter issue year'
              valueAsNumber={true}
            />
            <div className='flex flex-col-reverse justify-end w-full gap-1 sm:gap-3 sm:flex-row md:gap-3'>
              <CancelButton text='Cancel' />
              <SubmitButton
                mainText={submitButtonText}
                altText={isUpdateMode ? 'Updating issue' : 'Creating issue'}
                isSubmitting={methods.formState.isSubmitting}
              />
            </div>
          </form>
        </FormProvider>
      </FormWrapper>

      {isLoading && (
        <Modal>
          <PendingStateLoader
            message={isUpdateMode ? 'Updating issue...' : 'Creating issue...'}
          />
        </Modal>
      )}
      {isSuccessful && (
        <Modal>
          <FullfilledStateLoader
            message={
              isUpdateMode
                ? 'Issue updated successfully'
                : 'Issue created successfully'
            }
            type={'success'}
          />
        </Modal>
      )}
      {errorFromServer && (
        <Modal>
          <FullfilledStateLoader
            message={
              isUpdateMode
                ? 'Issue update unsuccessful'
                : 'Issue creation unsuccessful'
            }
            type={'error'}
          />
        </Modal>
      )}
    </div>
  );
}
