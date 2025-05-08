import { connectDB } from '@/lib/mongoose/config';
import { Article } from '@/lib/mongoose/models/article';
import { Issue } from '@/lib/mongoose/models/issue';
import JournalStatCard from './JournalStatCard';
import { VolumeIcon, IssuesIcon, ArticlesIcon } from '@/components/icons/icons';

const getMaxVolume = async () => {
  'use server';
  try {
    await connectDB();
    const [maxVolumeIssue, issuesCount, articlesCount] = await Promise.all([
      Issue.findOne({ published: true }, { volume: 1 }).sort({ volume: -1 }),
      Issue.countDocuments({ published: true }),
      Article.countDocuments({ published: true }),
    ]);

    return {
      publishedVolumes: maxVolumeIssue?.volume,
      publishedIssues: issuesCount,
      publishedArticles: articlesCount,
    };
  } catch (error) {
    console.error('Error fetching max volume data:', error);
    throw error;
  }
};
async function JournalStats() {
  const data = await getMaxVolume();
  console.log('data:', data);
  return (
    <section className='flex justify-around gap-5 lg:gap-10'>
      <JournalStatCard
        title='Published volumes'
        value={data?.publishedVolumes}
        Icon={VolumeIcon}
        bg='bg-[#e5d4ff]'
      />
      <JournalStatCard
        title='Published issues'
        value={data?.publishedIssues}
        Icon={IssuesIcon}
        bg='bg-green-100'
      />
      <JournalStatCard
        title='Published articles'
        value={data?.publishedArticles}
        Icon={ArticlesIcon}
        bg='bg-[#ffff33]/30'
      />
    </section>
  );
}

export default JournalStats;

// const SkeletonLoader = () => {
//     return (
//       <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
//         <div className="flex flex-col items-center p-4">
//           <div className="w-1/2 h-4 bg-gray-200 rounded-lg mb-4"></div>
//           <div className="flex justify-between w-full">
//             <div className="w-1/3 h-4 bg-gray-200 rounded-lg mr-4"></div>
//             <div className="w-1/3 h-4 bg-gray-200 rounded-lg mr-4"></div>
//             <div className="w-1/3 h-4 bg-gray-200 rounded-lg"></div>
//           </div>
//         </div>
//       </div>
//     );
//   };
