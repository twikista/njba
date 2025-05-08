import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import Main from '@/components/shared/Main';
// import coverImage from '@/../public/bijed_cover_image.jpg';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { getPublishedIssues } from '@/lib/actions/issues';
import { H1, H2, H3 } from '@/components/shared/headings';

export const metadata = {
  title: 'Archive',
  description:
    'Access all issues and articles published by Nigeria Journal of Business Administration (NJBA). The NJBA is the official journal of the Department of Business Administration, Faculty of Management Sciences, University of Benin, Benin city, Nigeria.',
};

async function Archive() {
  const issues = await getPublishedIssues();
  console.log(issues);
  if (!issues || issues.length === 0) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Main className=''>
          <div className='flex items-center justify-center h-full mt-14 font-medium'>
            <H3 className='text-neutral-500 md:text-3xl'>
              Issues will be uploaded soon
            </H3>
          </div>
        </Main>
        <Footer />
      </div>
    );
  }
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main className='gap-4'>
        <H1 className='mt-5'>Archive</H1>
        <div className='border rounded-lg border-neutral-300'>
          {issues.map((issue) => (
            <div
              key={issue._id}
              className='flex gap-5 sm:gap-10 [&:not(:last-child)]:border-b sm:flex-row border-neutral-300  sm:py-4 sm:px-4 py-2 px-2'
            >
              <div className='flex-1'>
                <H2 className='md:text-base text-[#006798] hover:text-[#008acb] group uppercase font-semibold'>
                  <Link
                    href={`/archive/${issue.ref}`}
                    className='group-hover:underline'
                  >
                    Nigeria Journal of Business Administration
                  </Link>
                </H2>
                <p className='font-medium text-sm text-neutral-500'>
                  {issue.issueTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Main>
      <Footer />
    </div>
  );
  // return (
  //   <div className='flex flex-col min-h-screen'>
  //     <Header />
  //     <Main className='gap-4 h-full'>
  //       {/* <H1 className='mt-5'>Archive</H1> */}
  //       <div className='flex items-center justify-center h-full font-medium'>
  //         <p className='text-neutral-500 md:text-3xl'>
  //           Archive will be uploaded soon
  //         </p>
  //       </div>
  //     </Main>
  //     <Footer />
  //   </div>
  // );
}

export default Archive;
