import { H1, H3 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';
import React from 'react';

export const metadata = {
  title: 'Editorial Team',
  description:
    'The MSR Editorial Team is composed of dedicated professionals who ensure the journal maintains high standards of academic integrity and quality in research publication.',
};

const editors = [
  {
    department: 'Accounting',
    editors: [
      'prof. Alade Sule Omoye',
      'Prof. Eyesan Leslie Dabor',
      'Prof. Emmanuel Eragbhe',
      'Prof. Peter Okoeguale Ibadin',
      'prof. James odia',
      'Prof. Killian Ogiedu',
      'Prof. Osasu Obaretin',
    ],
  },
  {
    department: 'Finance',
    editors: [
      'Prof. (Mrs) G.A. Nwokoye',
      'Prof. (Mrs) E.I. Evbayiro-Osagie',
      'Prof. M.G. Ajao',
      'Prof. E.J. Idolor',
      'Dr. O.G. Omorunkuwa',
    ],
  },
  {
    department: 'Business Administration',
    editors: [
      'Prof. Andrew Tafamel',
      'Prof. Ibrahim Shaibu',
      'Prof. J.O. Ejechi',
      'Dr. Omorodion Omoregbe',
    ],
  },
  {
    department: 'Entrepreneurship',
    editors: [
      'Dr. Mrs. A.O. Oriazowanlan',
      'Dr. S.O. Obeki',
      'Dr. mrs. A.C. Orakwe',
    ],
  },
  {
    department: 'Marketing',
    editors: [
      'Prof. Mrs. E.O. Odia',
      'Prof. Ehiabhi Patrick Oseyomon',
      'Dr. E.C. Gbandi',
      'Dr. S.J. Osifo',
    ],
  },
  {
    department: 'Human Resources Management',
    editors: [
      'Dr. Mrs. E.E. Idubor',
      'Prof. Mrs. E.I. Umemezia',
      'Dr. Mrs. O.R. Dania',
    ],
  },
];

const editorialAdvisoryBoard = [
  'Prof. Esosa Boniface Bob-Osaze',
  'Prof. Famous Izedonmi',
  'Prof. Sunday Osaretin Igbinosa',
  'Prof. Chinwuba Ambrose Okafor',
  'Prof. Adesina Oladipupo',
  'Prof. ofuan James Ilaboya',
];

function EditorialTeam() {
  return (
    <Main>
      <H1>MSR Editorial Team</H1>
      <TextBlockWithHeading
        // headingType='small'
        headingText='Editor-in-Chief'
        text='Prof. Augustine Osa Enofe'
        className='gap-0 p-0'
      />
      <TextBlockWithHeading
        // headingType='small'
        headingText='Business Manager'
        text='Dr. Osagie Osifo'
        className='gap-0 p-0'
      />
      <>
        {editors.map(({ department, editors }) => (
          <React.Fragment key={department}>
            <div>
              <H3>{`Editors: Department of ${department}`}</H3>
              <div>
                {editors.map((i) => (
                  <span key={i} className='block'>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </>
      <div>
        <H3>Editorial Advisory Board</H3>
        <div>
          {editorialAdvisoryBoard.map((i) => (
            <span key={i} className='block'>
              {i}
            </span>
          ))}
        </div>
      </div>
    </Main>
  );
}

export default EditorialTeam;
