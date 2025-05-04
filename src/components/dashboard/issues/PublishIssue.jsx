'use client';
import { Modal } from '@/components/shared/Modal';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PiWarningCircleBold } from 'react-icons/pi';
import { RiErrorWarningLine } from 'react-icons/ri';
import { TbCloudUpload, TbSend, TbUpload } from 'react-icons/tb';
import { toast } from 'sonner';

export default function PublishIssue({ issue, action }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyToPublish, setReadyToPublish] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const router = useRouter();

  const handler = async () => {
    setIsSubmitting(true);
    const response = await action(issue.ref, publishDate);
    if (response.ok) {
      //   setPublished(true);
      router.push(`/dashboard/issues`);
      toast.success('Issue published successfully');
      // setIsSubmitting(false)
    } else {
      //   setPublished(false);
      setIsSubmitting(false);
      toast.error('Something went wrong. Please try again');
    }
  };

  return (
    <div>
      <button
        className='btn btn-primary flex gap-1 items-center'
        onClick={() => setIsOpen(true)}
      >
        <TbCloudUpload className='size-5' />
        <span>Publish Issue</span>
      </button>
      {isOpen ? (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} withBackgroundClick={true}>
          <div className='bg-white p-4 sm:w-[540px] rounded-lg'>
            <div className='border-b py-2'>
              <h3 className='justify-center text-lg font-bold flex items-center gap-1'>
                <PiWarningCircleBold className='size-5 text-red-400' />
                Confirm Issue Publication
              </h3>
            </div>
            {readyToPublish ? (
              <div className='pt-4 space-y-4'>
                <p>Select issue publication date</p>
                <input
                  type='date'
                  name='publishDate'
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className='w-full py-1.5 px-2 border rounded-lg'
                />
                <div className='justify-end gap-2 pt-4 flex'>
                  <button
                    className='btn btn-danger bg-btn duration-150'
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={cn(
                      'btn btn-primary',
                      publishDate === '' || isSubmitting
                        ? 'bg-neutral-300 text-neutral-600 pointer-events-none'
                        : ''
                    )}
                    disabled={publishDate === '' || isSubmitting}
                    onClick={handler}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish issue'}
                  </button>
                </div>
              </div>
            ) : (
              <div className='pt-4 space-y-4'>
                <p className='font-semibold'>
                  You are about to publish{' '}
                  <span className='font-medium'> NJBA {issue.issueTitle}</span>{' '}
                </p>
                <p>
                  Once published, this issue will be immediately available
                  online and changes may be limited or require manual
                  intervention.
                </p>
                <p className='font-semibold text-red-500'>
                  Are you sure you want to proceed with publishing this issue?
                </p>
                <div className='flex justify-end gap-2 pt-4'>
                  <button
                    className='btn btn-danger bg-btn duration-150'
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => setReadyToPublish(true)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
