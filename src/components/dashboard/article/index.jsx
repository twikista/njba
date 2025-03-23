'use client';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import FormWrapper from '@/components/forms/FormWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import StepsFooter from './StepsFooter';
import StepFour from './StepFour';
import StepHeader from './StepHeader';
import {
  editArticleFormSchema,
  newArticleFormSchema,
} from '@/lib/schemas/issues';
import { handleValidationErrorFromServer } from '@/lib/helper';
import {
  removePdfFromStorage,
  uploadPdfToStorage,
} from '@/lib/firebase/services';
import { createArticle, updateArticle } from '@/lib/actions/articles';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Modal } from '@/components/shared/Modal';
import {
  FullfilledStateLoader,
  PendingStateLoader,
} from '@/components/shared/Loader';

const stepFields = {
  stepOne: ['volume', 'issue', 'startPage', 'endPage'],
  stepTwo: ['title', 'keywords', 'jelClassification'],
  stepThree: ['abstract', 'pdfFile'],
  stepFour: ['authors'],
};

const formfields = {
  title: ' title',
  authors: 'authors',
  volume: 'volume',
  issue: 'issue',
  startPage: 'startPage',
  endPage: 'endPage',
  abstract: 'abstract',
  keywords: 'keywords',
  jelClassification: 'jelClassification',
  pdfFile: 'pdfFile',
};

export default function ArticleForm({ initialFormState, params }) {
  console.log('params', params);
  const methods = useForm({
    defaultValues: initialFormState,
    resolver: zodResolver(
      initialFormState._id ? editArticleFormSchema : newArticleFormSchema
    ),
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errorFromServer, setErrorFromServer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();

  const steps = [
    {
      id: 1,
      component: <StepOne />,
      fields: stepFields['stepOne'],
      label: 'Article Meta data',
    },
    {
      id: 2,
      component: <StepTwo />,
      fields: stepFields['stepTwo'],
      label: 'Article basic information',
    },
    {
      id: 3,
      component: initialFormState._id ? (
        <StepThree hasInitialValue={params.article !== undefined} />
      ) : (
        <StepThree />
      ),
      fields: stepFields['stepThree'],
      label: 'Article content ',
    },
    {
      id: 4,
      component: <StepFour />,
      fields: stepFields['stepFour'],
      label: 'Article author(s)',
    },
  ];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;
  const handleNext = async () => {
    const { fields } = steps[currentStep - 1];
    const isStepValidated = await methods.trigger(fields);
    if (isStepValidated)
      // !isLastStep
      //   ? setCurrentStep((prev) => prev + 1)
      //   : setCurrentStep(steps.length)
      setCurrentStep(Math.min(steps.length, currentStep + 1));
  };
  const handleBack = () => setCurrentStep(Math.max(0, currentStep - 1));

  const isUpdateMode = !!initialFormState?._id;
  const formHeading = isUpdateMode ? 'Update Article' : 'Add New Article';

  /**
   * Prepares article data by uploading PDF and sanitizing data
   * @param {Object} data - Form data
   * @returns {Promise<Object>} - URL and sanitized data
   */
  const prepareArticleData = async (data) => {
    let url = null;
    //upload article pdf to firebase if pdf is changed by user
    if (data.pdfFile !== null) {
      initialFormState.pdfUrl &&
        (await removePdfFromStorage(initialFormState.pdfUrl));
      url = await uploadPdfToStorage(data);
    }
    // Upload PDF to storage
    // const pdfFileUrl = await uploadPdfToStorage(data);

    // Remove PDF file from data and sanitize
    const { pdfFile, ...formDataWithoutFile } = data;
    const sanitizedData = JSON.parse(JSON.stringify(formDataWithoutFile));

    return {
      pdfFileUrl: { new: url, existing: initialFormState.pdfUrl },
      sanitizedData,
    };
  };

  /**
   * Handles the server response after article creation
   * @param {Object} response - Server response
   */
  const handleSubmissionResponse = (response) => {
    if (response.ok) {
      setIsLoading(false);
      setIsSuccessful(true);
      methods.reset();
      toast.success('Article added successfully!');
      router.push(`/dashboard/issues/${params?.issue}`);
      const timeoutId = setTimeout(() => {
        setIsSuccessful(false);
      }, 5000);
      return () => clearTimeout(timeoutId);
    }

    // Handle different error types
    if (response?.errorType === 'validationError') {
      handleValidationErrorFromServer(response, formfields, setError);
    } else if (response?.errorType === 'other') {
      setErrorFromServer(response.error);
      const timeoutId = setTimeout(() => {
        setErrorFromServer('');
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  };

  //submit handler
  /**
   * Handles form submission for article creation
   * @param {Object} data - Form data including PDF file
   * @returns {Promise<void>}
   */
  const handleFormSubmission = async (data) => {
    setIsLoading(true);
    try {
      // Upload PDF and prepare data
      const { pdfFileUrl, sanitizedData } = await prepareArticleData(data);

      // Submit to server
      const response = isUpdateMode
        ? await updateArticle(sanitizedData, pdfFileUrl, initialFormState._id)
        : await createArticle(sanitizedData, pdfFileUrl.new, params);

      // Handle response
      handleSubmissionResponse(response);
    } catch (error) {
      setIsLoading(false);
      toast.error('Submission failed. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <motion.div>
      <FormWrapper formHeading={formHeading}>
        <StepHeader steps={steps} currentStep={currentStep} />
        {errorFromServer && (
          <div>
            <span>{errorFromServer}</span>
          </div>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmission)}
            className='mt-5 space-y-6 md:mt-0'
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex-grow md:mt-10'
              >
                {steps[currentStep - 1].component}
              </motion.div>
            </AnimatePresence>
            <StepsFooter
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={methods.formState.isSubmitting}
              isUpdateMode={isUpdateMode}
            />
          </form>
        </FormProvider>
      </FormWrapper>
      {isLoading && (
        <Modal>
          <PendingStateLoader
            message={
              isUpdateMode ? 'Updating Article...' : 'Creating Article...'
            }
          />
        </Modal>
      )}
      {isSuccessful && (
        <Modal>
          <FullfilledStateLoader
            message={
              isUpdateMode
                ? 'Article updated successfully'
                : 'Article created successfully'
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
                ? 'Article update unsuccessful'
                : 'Article creation unsuccessful'
            }
            type={'error'}
          />
        </Modal>
      )}
    </motion.div>
  );
}
