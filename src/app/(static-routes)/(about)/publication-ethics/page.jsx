import { H1, H2 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { TextBlockWithHeading } from '@/components/shared/TextBlockWithHeading';

export default function PublicationEthics() {
  return (
    <Main>
      <H1>Publication Ethics</H1>
      <p>
        The Nigeria Journal of Business Administration (NJBA) is committed to
        maintaining the highest ethical standards in scholarly publishing as
        outlined by the{' '}
        <a
          href='https://publicationethics.org/guidance/Guidelines'
          target='_blank'
          className='inline-block underline underline-offset-2 hover:text-blue-500'
        >
          <span>Committee on Publication Ethics (COPE)</span>
        </a>
        . The guidelines provided on this page serves as a framework for
        editors, authors, reviewers, and publishers to ensure ethical conduct in
        all aspects of manuscript submission, review, and publication.
      </p>
      <ul className='flex flex-col gap-1 pl-5 list-decimal'>
        <li>
          <div>
            <H2>Responsibilities of Authors</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Originality and Accuracy'
                  text='Authors must ensure that their work is original, clearly acknowledging the contributions of others. Data should be reported accurately, without any form of fabrication, falsification, or misrepresentation.Any use of previously published material must be clearly cited.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Authorship and Acknowledgment'
                  text='Authorship should be limited to those who have made a significant contribution to the conception, design, execution, or interpretation of the research. Inididuals who do not meet the criteria for authorship but are involved in the research process should be acknowledged appropriately.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Disclosure of Conflicts of Interest'
                  text='Any potential conflicts of interest—financial, personal, or professional—must be disclosed. This includes funding sources, affiliations, or any relationships that might influence the research findings. Transparency in funding sources and potential conflicts is mandatory.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Data Availability and Integrity'
                  text='Authors should be prepared to provide raw data, methodologies, and any relevant materials upon request to ensure reproducibility and integrity. Data manipulation or fabrication is strictly prohibited.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Duplicate Submission and Prior Publication'
                  text='Manuscripts submitted to the journal should not be under consideration elsewhere. If a portion of the work has been previously published, this must be fully disclosed with proper citations.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Responsibilities of Reviewers</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Confidentiality'
                  text='Reviewers must maintain confidentiality regarding the manuscripts they review. They should provide objective, constructive feedback while avoiding personal criticism. Reviewers should disclose any conflicts of interest and recuse themselves from the review process if necessary.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Objective and Fair Assessment'
                  text='Reviewers should disclose any conflicts of interest and refrain from using information gained during the review process for personal advantage.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Conflict of Interest'
                  text='Reviewers should be vigilant for plagiarism and misrepresentation in the manuscripts they review. They should also ensure that all references are properly cited.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Timeliness'
                  text='Reviewers are expected to complete their assessments promptly to facilitate a smooth publication process.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Alertness to ethical issues'
                  text='Reviewers should be vigilant for potential ethical concerns in the manuscript and inform the editor of any issues, including significant similarities with other published works that they are aware of.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Responsibilities of Editors</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Fair and Unbiased Decision-Making'
                  text='Editors should ensure that the editorial decision is based solely on the quality, relevance, and scientific integrity of the manuscript. Editors should guard against any bias or influence stemming from personal, institutional, or commercial interests.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Confidentiality'
                  text='Editors are responsible for maintaining the confidentiality of the peer-review process. Any information concerning a manuscript must be protected unless explicit permission is given for disclosure.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Managing Misconduct'
                  text='Editors must address allegations of research misconduct, such as plagiarism or data manipulation, with prompt and thorough investigations. Appropriate corrective actions—ranging from manuscript rejection to retraction—should be taken in accordance with established protocols.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Transparency in Corrections'
                  text='If errors or ethical issues are identified post-publication, the journal will ensure that corrections, clarifications, or retractions are issued in a clear and timely manner to maintain the integrity of the scholarly record.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Conflict of Interest'
                  text='Editors must disclose any conflicts of interest and manage them appropriately, including recusing themselves from decisions where a conflict exists.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Plagiarism and Duplicate Publication</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Detection and Prevention'
                  text='NJBA uses available tools and procedures to detect plagiarism and duplicate submissions. Authors are expected to ensure that their work is original and that any reuse of previous material is fully disclosed and properly referenced.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Consequences'
                  text='Instances of plagiarism or duplicate publication will be taken seriously and may result in rejection of the manuscript, retraction of the published paper, and notification to the author’s institution.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Handling Misconduct and Ethical Breaches</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Investigation Process'
                  text='NJBA will promptly investigate any allegations of ethical misconduct following COPE’s guidelines. This includes suspected cases of data fabrication, falsification, or other forms of research misconduct. The journal commits to a fair and confidential process for investigating any allegations of misconduct. All parties involved will have the opportunity to provide their account before any final decision is made.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Corrective Measures'
                  text='If errors are discovered post-publication or ethical breaches confirmed, , actions may include retraction of published articles, issuance of corrections, or bans on future submissions. The journal will notify relevant institutions or funding bodies if necessary.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Appeals and Complaints</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Author and Reviewer Appeals'
                  text='Authors or reviewers who feel that a decision was made in error or unfairly are encouraged to submit a formal appeal. Appeals will be reviewed impartially by an independent committee where appropriate.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='External Complaints'
                  text='NJBA welcomes external feedback on ethical issues. All complaints will be taken seriously and addressed in line with COPE recommendations.'
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <H2>Confidentiality and Data Protection</H2>
            <ul className='flex flex-col gap-1 list-disc'>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Manuscript Confidentiality'
                  text='All submitted manuscripts are treated as confidential. Editorial decisions, reviewer reports, and related communications are kept secure and used solely for the purpose of editorial evaluation.'
                />
              </li>
              <li>
                <TextBlockWithHeading
                  className='px-0'
                  headingText='Compliance with Data Protection Laws'
                  text='The journal ensures that all personal data provided during the submission and review process is handled in accordance with applicable data protection regulations.'
                />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </Main>
  );
}
