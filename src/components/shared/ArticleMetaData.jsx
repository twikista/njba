import React from 'react';

const ViewPDF = () => {
  return <div className='text-center'>view PDF</div>;
};

const PublishedInfo = () => {
  return (
    <div className='rounded-md overflow-hidden  bg-[#d4e499]'>
      <div className='p-4 '>heading</div>
      <div className='py-2 bg-[#e8e3df]'>info</div>
    </div>
  );
};

export default function ArticleMetaData() {
  return (
    <aside className='w-full max-w-60 h-full border'>
      <PublishedInfo />
      <ViewPDF />
    </aside>
  );
}
