import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronLeft } from 'react-icons/fa6';
import { MdOutlineClose } from 'react-icons/md';
import unibenLogo from '../../../../public/uniben_logo.png';
import { cn } from '@/lib/utils';

export const SubMenuItem = ({ title, href, className, toggleMenu }) => {
  return (
    <li className='flex items-center py-3 border-b '>
      <Link
        href={href}
        className={cn('flex w-full bg-transparent pl-1', className)}
        onClick={toggleMenu}
      >
        <p className='text-base font-medium text-gray-700'>{title}</p>
      </Link>
    </li>
  );
};

export const MobileNav = ({
  active,
  setActive,
  navbarOpen,
  setNavbarOpen,
  menuItems,
}) => {
  // const [activeIndex, setActiveIndex] = useState(null)

  // toggle menu handler
  const toggleMenu = () => {
    setNavbarOpen(!navbarOpen);
    setActive(null);
  };
  // console.log(active)

  //Menu item click handler
  return (
    <>
      <AnimatePresence>
        {navbarOpen && (
          <motion.nav
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key={'mobileNav'}
            className='bg-white fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-screen w-full flex-col lg:hidden'
          >
            <div className='flex items-center justify-between h-24 p-4'>
              <Link href='/' className='block max-w-[145px] sm:max-w-[180px]'>
                <Image
                  src={unibenLogo}
                  alt='uniben logo'
                  width={30}
                  height='auto'
                  className='rounded-full md:hidden'
                />
              </Link>
              <button
                type='button'
                onClick={toggleMenu}
                className='flex-col items-center justify-center font-bold navbarClose lg:hidden'
                name='navbarClose'
                aria-label='navbarClose'
              >
                <MdOutlineClose className='text-2xl text-gray-700' />
              </button>
            </div>
            <div className='flex flex-col flex-1 lg:hidden overflow-clip'>
              <ul className='flex-1 px-4 overflow-hidden'>
                {menuItems.map((menuItem, index) => (
                  <div key={index}>
                    {menuItem.subMenuItems ? (
                      <li
                        key={menuItem.pathName}
                        className='flex items-center justify-between py-3 text-base font-medium text-gray-700 capitalize border-b cursor-pointer hover:text-primary-light first:border-t'
                        onClick={() => {
                          setActive(menuItem);
                        }}
                      >
                        <span>{menuItem.pathName}</span>
                        <FaChevronRight className='text-xs text-gray-600' />
                      </li>
                    ) : (
                      menuItem.url && (
                        <li
                          key={menuItem.pathName}
                          className='flex items-center justify-between py-3 text-base font-medium text-gray-700 capitalize border-b cursor-pointer hover:text-primary-light first:border-t'
                          onClick={toggleMenu}
                        >
                          <Link href={menuItem.url} className='w-full'>
                            {menuItem.pathName}
                          </Link>
                        </li>
                      )
                    )}
                  </div>
                ))}
              </ul>
            </div>
            {/* sub menu overlay */}
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  initial={{ x: 800 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.2 }}
                  exit={{ x: 800 }}
                  key={active}
                  className='bg-white absolute inset-0 z-[22]'
                >
                  <div className='flex items-center justify-between h-12 px-4 pt-4'>
                    {active ? (
                      <button
                        onClick={() => setActive(null)}
                        className='flex items-center gap-[2px] text-base font-bold text-gray-700'
                      >
                        <FaChevronLeft className='text-xs text-gray-700' />
                        <span>Back</span>
                      </button>
                    ) : (
                      <span>Logo</span>
                    )}
                    <button
                      type='button'
                      onClick={toggleMenu}
                      className='flex-col items-center justify-center font-bold navbarClose lg:hidden'
                      name='navbarClose'
                      aria-label='navbarClose'
                    >
                      <MdOutlineClose className='text-2xl text-gray-700' />
                    </button>
                  </div>
                  <div className='flex-1 px-4'>
                    {active && (
                      <div className='flex items-center justify-center gap-1 py-2 rounded-sm bg-secondary'>
                        <h3 className='text-lg font-semibold text-center capitalize text-white'>
                          {active.pathName}
                        </h3>
                      </div>
                    )}
                    <ul className='flex flex-col '>
                      {active &&
                        active.subMenuItems.map((item) => (
                          <SubMenuItem
                            key={item.pathName}
                            title={item.pathName}
                            href={item.url}
                            toggleMenu={toggleMenu}
                          />
                        ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
