import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { H2 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-1 w-full h-full mx-auto sm:px-4 max-w-7xl'>
        <Main>
          <p className='mt-4 text-justify'>
            Welcome to the home page of the Nigeria Journal of Business
            Administarion (NJBA), a publication of the Department of Business
            Administration, Faculty of Management Sciences, University of Benin,
            Benin city, Nigeria.
          </p>
          <p>
            The NJBA has as its principal goal the promotion of academic
            excellence in research in the management sciences and the
            propagation of management knowledge between the academic,
            professional and business worlds. Each issue is designed to advance
            the frontiers of knowledge in management. Articles are carefully
            selected to provide the reader with an analytical, theoretical or
            application-oriented approach to managerial problems.
          </p>
          <p>
            This NJBA is published twice a year and welcome papers on
            Internarional business and management, Marketing, Business
            administration, Operations Rescarch, Management information systems,
            and Human resource management.
          </p>
          <div>
            <div className='flex flex-col rounded-[4px] bg-[#dee499] p-2  gap-5'>
              <div className='py-2 border-b border-gray-400/60'>
                <H2>Quick facts about the MSR</H2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-5 '>
                <TextBlockWithHeading
                  heading='Submission'
                  text='The MRS accepts submissions from authors on an on-going basis. Only submissions that adhere to the MSR Authors guide will be considered for review.'
                />
                <TextBlockWithHeading
                  heading='Publication'
                  text='The MSR is published bi-anually in June and December respectively. Only accepted articles as determined by the editorial board will be published'
                />
                <TextBlockWithHeading
                  heading='Access'
                  text='The MSR is an open access Journal. Articles are licenced under the Creative Common Attribution 4.0. making them available for free after publication.  '
                />
                <TextBlockWithHeading
                  heading='Review'
                  text='The MSR adopts the double-blind peer review system. This eliminates any form of bias and ensures only high qulity submissions are accepted for publishing.'
                />
              </div>
            </div>
          </div>
        </Main>
      </main>
      <Footer />
    </div>
  );
}
