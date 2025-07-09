import { auth } from '../../../../auth';
import MobileNavItems from './MobileNavItems';

export default async function MobileNav() {
  const session = await auth();
  return (
    <nav className='flex bg-secondary fixed z-30 bottom-0 left-0 right-0 md:px-8 lg:hidden py-1 px-2 overflow-x-scroll overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [&::-webkit-overflow-scrolling]:touch'>
      <MobileNavItems session={session} />
    </nav>
  );
}
