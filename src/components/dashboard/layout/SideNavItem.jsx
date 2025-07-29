'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function SideNavItem({ link, linkText, OutlineIcon, FillIcon }) {
  const pathname = usePathname();
  const active = (href) =>
    pathname === href || pathname.includes(href.split('/')[2]);

  return (
    <li
      className={cn(
        'flex items-center text-gray-50 rounded-2xl hover:border hover:border-[#ffebb2] hover:text-[#ffebb2] group/item transition-all',
        // (pathname.includes(link.split('/')[2]) || pathname === link) &&
        active(link) && 'border-[#ffebb2] border text-[#ffebb2]'
      )}
    >
      <Link
        href={link}
        // onMouseOver={() => setIsHovered(true)}
        // onMouseOut={() => setIsHovered(false)}
        className={cn(
          'flex w-full gap-3 px-3 py-4 text-lg items-center',
          active(link) && 'text-[#ffebb2]'
        )}
      >
        {active(link) ? (
          <FillIcon className='w-5' />
        ) : (
          <OutlineIcon className='w-5' />
        )}
        <span>{linkText}</span>
      </Link>
    </li>
  );
}

export default SideNavItem;
