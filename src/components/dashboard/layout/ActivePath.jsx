'use client';

import { usePathname } from 'next/navigation';

export function ActivePath() {
  const path = usePathname();
  const pathArray = path.split('/');
  const activePath = pathArray.length ? pathArray[pathArray.length - 1] : null;

  return (
    <div>
      <h1 className='text-3xl font-bold capitalize'>
        {activePath === 'dashboard' ? 'home' : activePath}
      </h1>
    </div>
  );
}
