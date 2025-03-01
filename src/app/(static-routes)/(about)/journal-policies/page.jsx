import { H1, H2 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';

export default function JournalPolicies() {
  return (
    <Main>
      <H1>Journal Policies</H1>
      <p>
        The following policies have been developed to ensure that the NJBA
        maintains rigorous standards in scholarly publishing while supporting
        the dissemination of high-quality research. They are subject to periodic
        review and updates to reflect evolving best practices in academic
        publishing.
      </p>
      <div className='flex flex-col gap-2'>
        <H2>Peer Review Policy</H2>
        <p>
          To ensure that all published work meets the highest standards of
          quality, rigor, and academic integrity, each submitted manuscript
          undergoes a thorough and impartial peer review process..
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Review Process:
            </span>
            Manuscripts are evaluated by at least two independent experts in the
            relevant field. The journal employs a double-blind review process
            whenever possible, ensuring that the identities of authors and
            reviewers remain confidential.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Timeliness:
            </span>
            Reviewers are expected to complete their evaluations within four
            weeks. If delays occur, they should notify the editorial team
            promptly.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Editorial Oversight:
            </span>
            The editorial team makes the final decision on the acceptance,
            revision, or rejection of manuscripts based on reviewer
            recommendations and the manuscript’s overall contribution to the
            field.
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Copyright Policy</H2>
        <p>
          The NJBA is committed to protecting the intellectual property of both
          the authors and the journal while ensuring broad dissemination of
          scholarly work.
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Copyright Transfer:
            </span>
            Upon acceptance for publication, all authors are required to
            transfer the copyright of their manuscript to the journal. This
            agreement grants the journal exclusive rights to publish, reproduce,
            and distribute the work.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Author Rights:
            </span>
            While the journal holds the copyright, authors retain limited rights
            for non-commercial use, such as self-archiving in institutional
            repositories or personal websites, provided the published version is
            cited appropriately..
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Open Access Policy</H2>
        <p>
          To maximize the visibility and accessibility of research, The NJBA
          adopts an open access model under the Creative Commons Attribution 4.0
          International License{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            className='inline-block underline hover:text-blue-600'
          >
            (CC BY 4.0).
          </a>
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Accessibility:{' '}
            </span>
            All articles published in the journal are freely accessible online,
            without subscription barriers. This promotes the global
            dissemination of knowledge and fosters a wider academic impact.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Attribution:
            </span>
            Users are free to share and adapt the work as long as appropriate
            credit is given to the authors and the original source is linked.
            This encourages wider dissemination and engagement with research
            findings
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <H2>Plagiarism Policy</H2>
        <p>
          The NJBA take plagiarism very seriously and employ strict measures to
          maintain academic integrity.
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc md:pl-8'>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Detection:
            </span>
            All submitted manuscripts will be checked for plagiarism using
            industry-standard software before being sent for peer review.
          </li>
          <li>
            <span className='inline-block font-medium pr-[2px]'>
              Consequences:
            </span>
            If plagiarism is detected, the manuscript will be subject to a
            formal investigation. Outcomes may include manuscript rejection,
            publication retraction, or issuance of corrections. In serious
            cases, the authors’ affiliated institutions may be notified.
          </li>
        </ul>
      </div>
    </Main>
  );
}
