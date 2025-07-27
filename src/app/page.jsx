import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { H2 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-1 w-full h-full mx-auto sm:px-4 max-w-7xl'>
        <Main>
          <p className='mt-4 text-justify'>
            Welcome to the official website of the Management Sciences Review
            (MSR), a publication of the Faculty of Management Sciences,
            University of Benin, Benin city, Nigeria. The Journal is dedicated
            to promoting and advancing research and practice across all
            disciplines in the management sciences including Accounting,
            Acturial Science, Audit, Business Administration, Entrepreneurship,
            Finance, Forensic Accounting, Human Resource Management, Insurance,
            Magement and Information Systems, Marketing, Taxation, and
            relatedfields in Humanities and Social Sciences.
          </p>
          <p>
            The MSR aims to proivde a platform for researchers, academicians,
            practitioners and policy makers to engage and share knowledge in the
            form of high quality empirical and theoretical research papers in
            both print and online versions.
          </p>
          <div>
            <div className='flex flex-col rounded-[4px] bg-gray-200 p-2  gap-5'>
              <div className='py-2 border-b border-gray-400/60'>
                <H2>Quick facts about the MSR</H2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-5 '>
                <TextBlockWithHeading
                  headingText='Submission'
                  text='The MRS accepts submissions from authors on an on-going basis. Only submissions that adhere to the MSR Authors guide will be considered for review.'
                />
                <TextBlockWithHeading
                  headingText='Publication'
                  text='The MSR is published bi-anually in June and December respectively. Only accepted articles as determined by the editorial board will be published'
                />
                <TextBlockWithHeading
                  headingText='Access'
                  text='The MSR is an open access Journal. Articles are licenced under the Creative Common Attribution 4.0. making them available for free after publication.  '
                />
                <TextBlockWithHeading
                  headingText='Review'
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
