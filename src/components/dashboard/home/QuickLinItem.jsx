import Link from 'next/link';

function QuickLinkItem({ linkText, Icon, linkUrl }) {
  return (
    <Link
      href={linkUrl}
      className='flex items-center flex-1 gap-2 py-2 border-solid rounded-md text-[#800080] hover:text-blue-600 gray-300'
    >
      <Icon className='w-6 h-6' />
      <span className='underline'>{linkText}</span>
    </Link>
  );
}

export default QuickLinkItem;
