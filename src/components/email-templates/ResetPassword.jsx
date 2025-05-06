import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export const PasswordResetEmailTemplate = ({ name, resetLink, link }) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your NJBA Account Passord</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans'>
          {/* Hero Section */}
          <Section className='bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-lg'>
            <Container className='mx-auto px-6 py-10 text-center'>
              <Heading className='text-3xl font-bold text-white m-0'>
                Password Reset Request
              </Heading>
              {/* <Text className="text-blue-100 text-lg mt-2 mb-0">
                  Account Activation
                </Text> */}
            </Container>
          </Section>

          {/* Main Content */}
          <Container className='mx-auto px-6 max-w-lg'>
            <Section className='bg-white p-6 rounded-b-lg shadow-sm'>
              <Text className='text-base text-gray-800 mb-4'>
                Hi {name}, we received a request to reset your password for your{' '}
                <strong>NJBA</strong> account.
              </Text>

              <Text className='text-base text-gray-800 mb-4'>
                Click the button below to reset your password. This link is
                valid for a limited time only:
              </Text>

              <Section className='text-center my-6'>
                <Button
                  href={resetLink}
                  className='bg-primary text-white text-sm font-medium '
                >
                  Reset Password
                </Button>
              </Section>

              <Text className='text-sm text-gray-600 mb-6'>
                If you didn’t request a password reset, you can safely ignore
                this email—no changes will be made to your account.
              </Text>
            </Section>

            {/* Footer */}
            <Section className='text-center py-6'>
              <Text className='text-gray-500 text-sm'>
                &copy; {new Date().getFullYear()} {journalName}. All rights
                reserved.
              </Text>
              <Text className='text-gray-500 text-sm'>
                <Link href='/' className='text-blue-800 underline'>
                  Visit Our Website
                </Link>{' '}
                •{' '}
                <Link href='/contact' className='text-blue-800 underline'>
                  Contact Us
                </Link>{' '}
                •{' '}
                <Link href='/privacy' className='text-blue-800 underline'>
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmailTemplate;
