import { H1, H3 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';

export const metadata = {
  title: 'Submission Guidelines',
  description:
    'Find detailed submission guidelines for authors looking to publish in the Nigeria Journal of Business Administration (NJBA). Learn about manuscript preparation, formatting, and submission procedures to ensure your work meets our standards.',
  alternates: {
    canonical: `${process.env.SITEMAP_BASE_URL}/submission-guide`,
  },
};

export default function SubmissionGuide() {
  return (
    <Main>
      <H1>Submission Guidelines</H1>
      <div className='flex flex-col gap-6 text-black max-w-3xl'>
        <p>
          The Nigeria Journal of Business Administration (NJBA) shall welcome
          articles from various authors subject to the following guidelines:
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc'>
          <li>
            The length of each manuscript should be between 12 and 15 pages.
          </li>
          <li>
            The main body of the article should be typed doubled-spaced on a A4
            sized paper. An e-copy can be sent to the editor.
          </li>
          <li>
            The first page of the manuscript should contain the title of the
            article, as well as the name, e-mail address, institutional
            affliation and mailing address (where necessary) of the author(s).
          </li>
          <li>
            The second page should contain an abstract of not more than 250
            words with the beginning of the article. Please do not put the
            name(s) of the author(s) on this page
          </li>
          <li>
            All citiations (both in-text citations and the reference list) must
            conform to the latest edition of the American Psychological
            Association (APA) referencing style.
          </li>
          <li>
            Manuscripts are evaluated based on significance of contribution,
            originality of material, clarity of presentation, and relevance to
            the Nigerian environment.
          </li>
        </ul>
      </div>
    </Main>
  );
}
