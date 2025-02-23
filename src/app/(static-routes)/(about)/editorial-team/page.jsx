import { H1, H2, H3 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';
import { editorialBoard } from '@/static/editorial-board';

const Editor = (editor) => {
  return (
    <div>
      <H3>{editor.name}</H3>
      <span className='block'>{`Department of ${editor.department}`}</span>
      <span className='block'>{editor.faculty}</span>
      <span className='block'>{editor.institution}</span>
    </div>
  );
};

function EditorialTeam() {
  return (
    <Main>
      <H1>NJBA Editorial Team</H1>
      <div className='flex flex-col gap-6 text-black max-w-3xl'>
        {Object.keys(editorialBoard).map((category) => (
          <div key={category} className='flex flex-col gap-1'>
            <H2 className='font-semibold text-base md:text-xl'>{category}</H2>
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
