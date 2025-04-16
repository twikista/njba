import Main from '@/components/shared/Main';
import { H1, H2, H3 } from '@/components/shared/headings';

export const metadata = {
  title: 'Contact',
  description:
    'React out to us on through the address on this page. Department of Business Administration, Faculty of Management of Sciences, University of Benin, Benin City',
};

export default function Contact() {
  return (
    <Main>
      <H1>Contact</H1>
      <div className='flex flex-col gap-5 md:flex-row md:gap-20 md:my-10'>
        <div>
          <H2>NJBA Editorial Office</H2>
          <span className='block'>Department of Business Administration</span>
          <span className='block'>Faculty of Management Sciences</span>
          <span className='block'>University of Benin, Benin city</span>
          <span className='block'>Edo state, Nigeria.</span>
          <span className='block'>Email: njba@uniben.edu</span>
        </div>
        <div>
          <H2>Support Contact</H2>
          <span className='block'>Dr. S.A. Adekunle</span>
          <span className='block'>Business Editor, NJBA</span>
          <span className='block'>Email: simon.adekunle@uniben.edu</span>
          <span className='block'>Phone: +234 806 647 1423</span>
        </div>
      </div>
    </Main>
  );
}
