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

export const ResetUserPasswordEmailTemplate = ({ name, password }) => {
  return (
    <Html>
      <Head />
      <Preview>Your MSR Account Passord</Preview>
      <Tailwind>
        <Body className='font-sans bg-white'>
          {/* Hero Section */}
          <Section className='p-2 pt-4 bg-gray-200 w-fit'>
            {/* <Section className='bg-white'>
              <Container className='px-6 py-10 mx-auto text-center'>
                <Heading className='m-0 text-3xl font-bold text-black'>
                  Password Reset Request
                </Heading>
              </Container>
            </Section> */}

            {/* Main Content */}
            <Container className='max-w-lg px-6 mx-auto'>
              <Section className='p-6 bg-white rounded-t-lg shadow-sm '>
                <Heading className='m-0 text-xl font-bold text-black'>
                  Password Reset Request
                </Heading>
              </Section>
              <Section className='p-6 bg-white rounded-b-lg shadow-sm'>
                <Text className='mb-4 text-base text-gray-800'>
                  Hi {name}, we received a request to reset your password for
                  your <strong>MSR</strong> account.
                </Text>

                <Text className='my-4 text-gray-700'>
                  Below is the new password to access your account:
                </Text>

                <Section className='p-4 my-6 border border-gray-200 rounded-lg bg-gray-50'>
                  <Text className='my-2 text-gray-700'>
                    <strong>Password:</strong> {password}
                  </Text>
                </Section>

                <Text className='mb-4 text-base text-gray-800'>
                  Please change your password as soon as possible:
                </Text>

                <Text className='my-6 text-center'>
                  <a
                    href='http://localhost:3000/auth/login'
                    target='_blank'
                    className='text-blue-600 underline hover:text-blue-800'
                  >
                    Click here to login
                  </a>
                </Text>

                <Text className='mb-6 text-sm text-gray-600'>
                  If you didn’t request a password reset, you can safely ignore
                  this email—no changes will be made to your account.
                </Text>
              </Section>

              {/* Footer */}
              <Section className='py-6 text-center'>
                <Text className='text-sm text-gray-500'>
                  &copy; {new Date().getFullYear()} MSR. All rights reserved.
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
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetUserPasswordEmailTemplate;
