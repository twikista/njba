'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function MobileNavItem({ url, linkText, OutlineIcon, FillIcon }) {
  const pathname = usePathname();
  return (
    <li
      className={cn(
        'flex items-center text-gray-50 hover:text-[#ffebb2] px-2 py-1.5 rounded-md',
        pathname.includes(url.split('/')[2]) || pathname === url
          ? 'bg-gray-200/20'
          : null
      )}
    >
      <Link
        href={url}
        className={cn(
          `flex flex-col items-center w-full text-sm`,
          pathname.includes(url.split('/')[2]) || pathname === url
            ? 'text-[#ffebb2]'
            : null
        )}
      >
        {pathname !== url ? (
          <OutlineIcon className={cn('w-5')} />
        ) : (
          <FillIcon className={cn('w-5')} />
        )}

        <span>{linkText}</span>
      </Link>
    </li>
  );
}

export default MobileNavItem;
