'use client';

import Link from 'next/link';
import { FaCreativeCommonsBy, FaCreativeCommons } from 'react-icons/fa';
import { useSelectedLayoutSegment } from 'next/navigation';
import { footerItems } from '@/static/menuItems';
import uniqid from 'uniqid';

function Footer() {
  const routeSegment = useSelectedLayoutSegment();
  const currentYear = new Date().getFullYear();
  return (
    <>
      {routeSegment !== 'dashboard' && (
        <footer className='px-5 text-sm text-white bg-primary sm:text-base md:px-10'>
          <div className='w-full py-8 mx-auto space-y-5 max-w-7xl'>
            <div className='grid justify-between grid-cols-2 gap-5 mx-auto md:grid-cols-4 font-barlow'>
              {footerItems.map((menuItem) =>
                menuItem.subMenuItems ? (
                  <ul key={menuItem.pathName} className='space-y-1'>
                    {menuItem.subMenuItems
                      .filter(({ pathName }) => pathName !== 'home')
                      .map(({ pathName, url }) => (
                        <li
                          key={pathName}
                          className='hover:underline underline-offset-2 w-fit'
                        >
                          <Link href={url}>{pathName}</Link>
                        </li>
                      ))}
                  </ul>
                ) : null
              )}
              <div>
                <h3 className='text-base font-bold capitalize md:text-lg'>
                  Contact
                </h3>
                <div>
                  <p>Tel:+234 803 954 5191</p>
                  <p>Email:njba@uniben.edu</p>
                </div>
              </div>
            </div>
            <span className='h-[1px] bg-[#fafafa]/50 block' />
            <div className='flex flex-col items-center'>
              <div className='text-xs text-center ms:text-sm sm:text-base'>
                <div className='flex items-center text-'>
                  <span className='uppercase'>&copy;NJBA</span>
                  <span>&nbsp;</span>
                  <span>{currentYear}</span>
                  <span>&nbsp;&#124;&nbsp;</span>
                  <span className=''>Powered by Inventure Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
