'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import { cn } from '../../lib/utils';

const Breadcrumb = ({ homeElement, homeUrl, isProtectedRoute }) => {
  const paths = usePathname().split('/').filter(Boolean);

  const getHref = (index) => {
    if (isProtectedRoute && paths.length === 1) return '';
    return `/${paths.slice(0, index + 1).join('/')}`;
  };

  const isCurrentIssuePath = (index) => {
    return paths.includes('current') && index + 1 === paths.length - 1;
  };

  return (
    <nav
      className={cn(
        'pt-2 mb-4 text-sm md:text-base block',
        paths.length === 0 && 'hidden'
      )}
    >
      <ul className='flex flex-wrap items-center capitalize'>
        {paths.length > 0 && !isProtectedRoute && (
          <li>
            <Link href={homeUrl} className='text-primary hover:text-blue-600'>
              {homeElement}
            </Link>
            <FaChevronRight className='text-[9px] px-0.5' />
          </li>
        )}
        {paths.map((link, index) => {
          const href = getHref(index);
          const isLastItem = index === paths.length - 1;

          if (isLastItem) {
            return (
              <li key={index} className='text-gray-400'>
                <span>{link}</span>
              </li>
            );
          }

          if (isCurrentIssuePath(index)) {
            return (
              <React.Fragment key={index}>
                <li className='text-gray-400'>
                  <span>{link}</span>
                </li>
                <FaChevronRight className='text-[10px]' />
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              <li>
                <Link href={href} className='text-primary hover:text-blue-600'>
                  {link}
                </Link>
                <FaChevronRight className='w-4' />
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
