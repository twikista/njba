import { Suspense } from 'react';
// import Announcement from './Announcement'
import Archive from './Archive';
import Information from './Information';
import ajol from '../../../public/ajol_logo.png';
import Image from 'next/image';
import Announcement from './Announcements';

function Aside() {
  return (
    <aside className='w-full h-full p-4 pt-8 mt-5 mb-10 text-black border rounded-md lg:max-w-60 border-neutral-300 lg:border-0 lg:border-y-0 lg:rounded-none lg:mt-0 lg:mb-0'>
      <div className='flex flex-col space-y-16'>
        <span className='hidden text-base font-medium lg:block h-fit'>
          ISBN:2672-5991
        </span>
        <Suspense fallback={<p>loading...</p>}>
          <Announcement />
        </Suspense>
        {/* <Information /> */}
        {/* <Archive /> */}
      </div>
    </aside>
  );
}

export default Aside;
