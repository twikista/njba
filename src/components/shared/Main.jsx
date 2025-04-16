// import Breadcrumb from './Bread';
import { cn } from '@/lib/utils';
import Aside from '../Aside';
import Breadcrumb from './Breadcrumb';

function Main({ children, showAside = true, className }) {
  return (
    <div className='flex flex-col flex-1 w-full px-3 mx-auto text-sm 2xl:px-0 text-neutral-600 md:text-base lg:flex-row max-w-6xl'>
      <section className='flex flex-col flex-1 gap-0 pb-12 border-gray-200 lg:border-r lg:p-5'>
        <Breadcrumb
          homeElement='Home'
          homeUrl='/'
          isProtectedRoute={false}
          separator='/'
        />
        <div className={cn('flex flex-col gap-6 text-black', className)}>
          {children}
        </div>
      </section>
      {showAside && <Aside />}
    </div>
  );
}

export default Main;
