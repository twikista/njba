function JournalStatCard({ title, value, Icon, bg }) {
  return (
    <div
      className={`flex items-center justify-center flex-1 gap-2 px-2 py-3  lg:px-5 sm:py-5 ${bg} rounded-xl shadow-md `}
    >
      <div className='flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold sm: 4xl lg:text-6xl'>
          {value === undefined ? '0' : value}
        </p>
        <span className='text-xs text-center sm:text-sm lg:text-base '>
          {title}
        </span>
      </div>
      <div className='hidden text-gray-600 md:block'>
        <Icon className='w-10' />
      </div>
    </div>
  );
}

export default JournalStatCard;
