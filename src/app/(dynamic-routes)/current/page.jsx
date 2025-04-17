import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import Main from '@/components/shared/Main';
import React from 'react';

export default function page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main className='gap-4 h-full'>
        {/* <H1 className='mt-5'>Current</H1> */}
        <div className='flex items-center justify-center h-full font-medium'>
          <p className='text-neutral-500 md:text-3xl'>
            Current issue will be uploaded soon
          </p>
        </div>
      </Main>
      <Footer />
    </div>
  );
}
