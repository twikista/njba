import React from 'react';
import Main from '@/components/shared/Main';
import { H1, H2, H3 } from '@/components/shared/headings';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';
import { cn } from '@/lib/utils';

export default function AuthorsGude() {
  return (
    <Main>
      <H1>Authors Guidelines</H1>
      <div className='flex flex-col gap-6 text-black max-w-3xl'>
        <p>
          This guide provides essential information regarding manuscript
          submission, authorship, the editorial process, and ethical
          considerations. Please read carefully to ensure compliance with our
          guidelines.
        </p>
        <div>
          <H2>Manuscript Submission</H2>
          <ul className='flex flex-col gap-1 pl-5 list-disc'>
            <li>
              <TextBlockWithHeading
                headingText='Submission Method'
                headingType='h3'
                text='Manuscripts should be submitted as a e-mail attachment to njba@uniben.edu, and copy simon.adekunle@uniben.edu.'
                className='px-0'
              />
            </li>
            <li>
              <TextBlockWithHeading
                headingText='Assessment Fee'
                headingType='h3'
                text='A non-refundable assessment fee of ₦8,000 should accompany each manuscript submission.'
                className='px-0'
              />
            </li>
            <li>
              <TextBlockWithHeading
                headingText='Submision Declaration'
                headingType='h3'
                text='Manuscript must be accompanied by a covering letter indicating clearly that the paper is not being submitted to any other publishers and that the Nigeria Journalof Business Administration owns the copyright when published.'
                className='px-0'
              />
            </li>
            <li>
              <TextBlockWithHeading
                headingText='Manuscript Scope'
                headingType='h3'
                text='Only manuscripts related to all functional areas of Business Administration are acceptable. They may be theoretical or empirical in nature but must be socholarly and show clear evidence of contribution to knowledge'
                className='px-0'
              />
            </li>
            <li>
              <TextBlockWithHeading
                headingText='Corresponding Author'
                headingType='small'
                text='The author who submits the manuscript will be designated as the corresponding author and must provide complete contact information for all co-authors, including full name, email address, institutional affliation and mailing address (where necessary).'
                className='px-0'
              />
            </li>
            <div className='flex flex-col gap-1'>
              <H3>Note:</H3>
              <ul className='flex flex-col gap-1 pl-5 list-disc'>
                <li>
                  Manuscripts already under review with NJBA should not be
                  submitted to any other journal.
                </li>
                <li>
                  By submitting a manuscript, authors confirm that their work is
                  original and that all co-authors have approved the submission.
                  Authors are responsible for ensuring that they have permission
                  to publish any data included in their manuscript.
                </li>
              </ul>
            </div>
          </ul>
        </div>

        <div className={cn('flex flex-col gap-1')}>
          <H2>Authorship</H2>
          <div>
            <p>
              Authorship should be restricted to individuals who have made
              substantial contributions to the conception, design,
              implementation, or interpretation of the research. Individuals
              with lesser contributions should only be acknowledged in the
              manuscript and not included as co-authors.
            </p>
            <p>
              Authors must thoughtfully determine and finalize the list and
              sequence of authors prior to submission. Any modifications to
              authorship after submission will only be permitted under
              extraordinary circumstances and must be explicitly communicated to
              the Editor. All authors must consent to any alterations.
            </p>
          </div>
        </div>
        <TextBlockWithHeading
          headingText='Manusacript Language'
          className='px-0'
          headingType='h2'
          text='All papers submitted for publication must be written in English.'
        />

        <TextBlockWithHeading
          headingText='Plagiarism Policy'
          className='px-0'
          headingType='h2'
          text='Plagiarism is deemed a serious violation of academic integrity and is strictly forbidden. Authors are required to accurately cite and credit all sources utilized in their research. All submissions will undergo a plagiarism detection process during the initial evaluation stage. Manuscripts with a plagiarism score exceeding 10% will be disqualified from further consideration. We encourage authors to uphold the highest standards of originality and ethical scholarship in their work.'
        />
        <div className={cn('flex flex-col gap-1')}>
          <H2>Correction of Articles</H2>
          <div>
            <p>
              Errors discovered by the author after submission but before
              approval for publication should be communicated swiftly to the
              editor of the Journal before the end of the review process.
            </p>
            <p>
              If significant errors are identified in published works, authors
              are obligated to inform the editor immediately and cooperate in
              correcting or retracting the paper if necessary. If errors are
              reported by third parties, authors must also assist the editor as
              required.
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
}
