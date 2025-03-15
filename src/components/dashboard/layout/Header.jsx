import { ActivePath } from './ActivePath';
import { auth } from '../../../../auth';

export async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className='fixed left-0 lg:left-[240px] right-0 flex items-center justify-between px-6 border-b border-gray-300 border-solid bg-gray-50'>
      <ActivePath />
      <span className='py-5'>{`Hi, ${user.firstName} ${
        user.lastName ? user.lastName : ''
      }!`}</span>
    </header>
  );
}
