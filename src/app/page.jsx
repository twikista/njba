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
          <div>
            <p>
              The NJBA is published twice a year and welcome papers from the
              following areas:
            </p>
            <ul className='pl-5 list-disc md:pl-8'>
              <li>Internarional business and management</li>
              <li>Business administration</li>
              <li>Operations Rescarch</li>
              <li>Marketing</li>
              <li>Management information systems</li>
              <li>Human resource management, and</li>
              <li>Other areas in the management sciences</li>
            </ul>
          </div>

          <div>
            <div className='flex flex-col rounded-xl p-2 md:p-4 gap-2.5 border-2'>
              <div className=''>
                <H2 className='md:text-xl underline-offset-8 font-semibold'>
                  Why Publish With Us
                </H2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-5 '>
                <TextBlockWithHeading
                  headingText='Backed by Academic Excellence'
                  className='p-0 md:max-w-96 gap-0'
                  headingClassName='font-semibold'
                  text='NJBA is published by the Department of Business Administration, University of Benin—a leading Nigerian institution known for its research and academic excellence.'
                />

                <TextBlockWithHeading
                  className='p-0 md:max-w-96 gap-0'
                  headingClassName='font-semibold'
                  headingText='Rigorous Peer Review'
                  text='NJBA maintains the highest academic standards through a transparent and constructive peer review process conducted by experienced academics and subject-matter experts.'
                />
                <TextBlockWithHeading
                  className='p-0 md:max-w-96 gap-0'
                  headingClassName='font-semibold'
                  headingText='Wide Visibility'
                  text='All articles in the NJBA are published online under an open access model, making them instantly available to a global audience.  '
                />
                <TextBlockWithHeading
                  className='p-0 md:max-w-96 gap-0'
                  headingClassName='font-semibold'
                  headingText='Timely and Fair Publication Process'
                  text='Our streamlined editorial workflow ensures timely decisions without compromising quality—ensuring your research is published without unnecessary delays.'
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
