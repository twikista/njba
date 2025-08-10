import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { Roboto_Flex } from 'next/font/google';

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
});

// export const bebasNeue = Bebas_Neue({
//   weight: ['400'],
//   subsets: ['latin'],
//   display: 'swap',
// });

export const metadata = {
  metadataBase: new URL('https://msreview.com.ng'),
  title: {
    default: 'MSR - Management Sciences Review',
    template: '%s - Management Sciences Review',
  },
  description:
    'The Management Sciences Review (MSR) is the official journal of the Faculty of Management Sciences, University of Benin, Benin city, Nigeria.',

  keyword: [
    'Academic',
    'journal',
    'Management sciences',
    'Humanities',
    'university of Benin',
    'UNIBEN',
    'Management Sciences Review',
    'MSR',
    'msreview',
    'Management Sciences Review',
    'Accounting',
    'Taxation',
    'Finace',
    'Business administration',
    'acturial science',
    'Insurance',
    'marketing',
    'management information system',
    'forensic Accounting',
    'audit',
    'human resource management',
    'management sciences',
    'Nigeria',
  ],
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${robotoFlex.className} flex flex-col min-h-screen text-black`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
