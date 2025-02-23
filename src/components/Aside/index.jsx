import { Suspense } from 'react';
// import Announcement from './Announcement'
import Archive from './Archive';
import Information from './Information';
import ajol from '../../../public/ajol_logo.png';
import Image from 'next/image';

function Aside() {
  return (
    <aside className='h-full w-full lg:w-[300px] p-4 text-neutral-600  border-neutral-300 border lg:border-0 rounded-md mt-5 lg:mt-0 pt-8 mb-10 lg:mb-0'>
      <div className='space-y-16'>
        <span className='font-medium text-xl hidden lg:block'>
          ISSN:0794-0672
        </span>
        <Suspense fallback={<p>loading...</p>}>
          {/* <Announcement /> */}
        </Suspense>
        <Information />
        <Archive />
        <div>
          <p className='font-medium mb-1'>Indexed by:</p>
          <a href='https://www.ajol.info/index.php/njbm' target='_blank'>
            <Image
              src={ajol}
              alt='logo of african journals online'
              width={200}
              height={200}
              className='w-[120px] h-auto'
            />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
