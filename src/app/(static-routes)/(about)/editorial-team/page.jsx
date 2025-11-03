import { H1, H2, H3 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';
import { editorialBoard } from '@/static/editorial-board';

export const metadata = {
  title: 'NJBA Editorial Team',
  description:
    'This page provide details about editorial team of the Nigeria Journal of Business Administration (NJBA), including the Editor-in-Chief, and Editorial Board members.',
  alternates: {
    canonical: `${process.env.SITEMAP_BASE_URL}/editorial-team`,
  },
};

const Editor = (editor) => {
  return (
    <div>
      <H3 className='font-semibold'>{editor.name}</H3>
      <span className='block'>{`Department of ${editor.department}, ${editor.faculty}`}</span>
      {/* <span className='block'>{editor.faculty}</span> */}
      <span className='block'>{editor.institution}</span>
    </div>
  );
};

function EditorialTeam() {
  return (
    <Main>
      <H1>NJBA Editorial Team</H1>
      <div className='flex flex-col gap-8 text-black max-w-3xl'>
        {Object.keys(editorialBoard).map((category) => (
          <div key={category} className='flex flex-col gap-0.5'>
            <H2 className='font-semibold text-base md:text-lg uppercase'>
              {category}
            </H2>
            {Array.isArray(editorialBoard[category]) ? (
              <ul className='flex flex-col gap-2'>
                {editorialBoard[category].map((editor) => (
                  <li key={editor.name}>
                    <Editor {...editor} />
                  </li>
                ))}
              </ul>
            ) : (
              <Editor {...editorialBoard[category]} />
            )}
          </div>
        ))}
      </div>
    </Main>
  );
}

export default EditorialTeam;
