import PDFViewerV2 from '@/components/shared/PDFViewerV2';
import ViewArticlePdf from '@/components/shared/ViewArticlePdf';
import { getArticle } from '@/lib/actions/articles';

// const PDFViewer = dynamic(() => import('@/components/shared/PDFViewer'), {
//   ssr: false,
// });

async function ViewPDF({ params }) {
  try {
    const param = await params;
    const article = await getArticle(param);

    if (!article) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-600 text-white'>
          <h1 className='text-2xl font-bold'>Article not found</h1>
        </div>
      );
    }

    return (
      <div className='flex flex-col min-h-screen bg-neutral-600'>
        <PDFViewerV2
          filePath={article.pdfUrl.split('/').at(-1)}
          params={param}
        />
      </div>
    );
  } catch (error) {
    // Error handling for any uncaught exceptions
    console.error('Error in ViewPDF component:', error);
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-600 text-white'>
        <h1 className='text-2xl font-bold'>Error loading article</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}

export default ViewPDF;
