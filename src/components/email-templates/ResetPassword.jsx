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
      <Preview>Reset your MSR Account Passord</Preview>
      <Tailwind>
        <Body className='font-sans bg-gray-100'>
          {/* Hero Section */}
          <Section className='rounded-t-lg bg-gradient-to-r from-blue-900 to-blue-700'>
            <Container className='px-6 py-10 mx-auto text-center'>
              <Heading className='m-0 text-3xl font-bold text-white'>
                Password Reset Request
              </Heading>
              {/* <Text className="mt-2 mb-0 text-lg text-blue-100">
                  Account Activation
                </Text> */}
            </Container>
          </Section>

          {/* Main Content */}
          <Container className='max-w-lg px-6 mx-auto'>
            <Section className='p-6 bg-white rounded-b-lg shadow-sm'>
              <Text className='mb-4 text-base text-gray-800'>
                Hi {name}, we received a request to reset your password for your{' '}
                <strong>MSR</strong> account.
              </Text>

              <Text className='mb-4 text-base text-gray-800'>
                Click the button below to reset your password. This link is
                valid for a limited time only:
              </Text>

              <Section className='my-6 text-center'>
                <Button
                  href={resetLink}
                  className='text-sm font-medium text-white bg-primary '
                >
                  Reset Password
                </Button>
              </Section>

              <Text className='mb-6 text-sm text-gray-600'>
                If you didn’t request a password reset, you can safely ignore
                this email—no changes will be made to your account.
              </Text>
            </Section>

            {/* Footer */}
            <Section className='py-6 text-center'>
              <Text className='text-sm text-gray-500'>
                &copy; {new Date().getFullYear()} {journalName}. All rights
                reserved.
              </Text>
              <Text className='text-sm text-gray-500'>
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
