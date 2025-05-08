import { RiLinkM } from 'react-icons/ri';

import QuickLinkItem from './QuickLinkItem';

import {
  BellPlusIcon,
  HouseIcon,
  LucideFilePlus2,
  SquarePenIcon,
  UserPenIcon,
  UserPlusIcon,
} from 'lucide-react';

function QuickLinks({ userRole }) {
  return (
    <div className='flex-1 p-2 bg-gray-200 rounded-lg'>
      <div className='flex items-center gap-1 px-4 py-3'>
        <RiLinkM className='w-4 h-4 md:w-5 md:h5 fill-gray-500' />
        <h4 className='text-base font-medium md:text-xl'>Quick Links</h4>
      </div>
      <div className='px-4 py-5 space-y-2 rounded-md bg-gray-50'>
        {userRole === 'editor' && (
          <QuickLinkItem
            Icon={LucideFilePlus2}
            linkUrl='/dashboard/issues/new-issue'
            linkText='Add new issue'
          />
        )}
        {userRole === 'editor' && (
          <QuickLinkItem
            Icon={BellPlusIcon}
            linkUrl={`/dashboard/announcements/new`}
            linkText='Add Announcement'
          />
        )}
        {userRole === 'admin' && (
          <>
            <QuickLinkItem
              Icon={UserPlusIcon}
              linkUrl='/dashboard/users/new-user'
              linkText='Add new user'
            />
            <QuickLinkItem
              Icon={UserPenIcon}
              linkUrl='/dashboard/users'
              linkText='Manage Users'
            />
          </>
        )}
        {/* {userRole === 'managing editor' && (
          <QuickLinkItem
            Icon={HourGlassIcon}
            linkUrl='/dashboard/issues?mode=final'
            linkText='Published Issues'
          />
        )}
        {userRole === 'managing editor' && (
          <QuickLinkItem
            Icon={StackIcon}
            linkUrl='/dashboard/issues?mode=draft'
            linkText='Unpublished Issues'
          />
        )} */}
        <QuickLinkItem
          Icon={SquarePenIcon}
          linkUrl='/dashboard/users/change-password'
          linkText='Change password'
        />

        <QuickLinkItem
          Icon={HouseIcon}
          linkUrl='/'
          linkText='Journal homepage'
        />
      </div>
    </div>
  );
}

export default QuickLinks;
