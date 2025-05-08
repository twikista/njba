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
      <Preview>Your NJBA Account Passord</Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          {/* Hero Section */}
          <Section className='p-2 pt-4 bg-gray-200 w-fit'>
            {/* <Section className='bg-white'>
              <Container className='mx-auto px-6 py-10 text-center'>
                <Heading className='text-3xl font-bold text-black m-0'>
                  Password Reset Request
                </Heading>
              </Container>
            </Section> */}

            {/* Main Content */}
            <Container className='mx-auto px-6 max-w-lg'>
              <Section className='bg-white p-6 rounded-t-lg shadow-sm '>
                <Heading className='text-xl font-bold text-black m-0'>
                  Password Reset Request
                </Heading>
              </Section>
              <Section className='bg-white p-6 rounded-b-lg shadow-sm'>
                <Text className='text-base text-gray-800 mb-4'>
                  Hi {name}, we received a request to reset your password for
                  your <strong>NJBA</strong> account.
                </Text>

                <Text className='text-gray-700 my-4'>
                  Below is the new password to access your account:
                </Text>

                <Section className='bg-gray-50 border border-gray-200 rounded-lg p-4 my-6'>
                  <Text className='text-gray-700 my-2'>
                    <strong>Password:</strong> {password}
                  </Text>
                </Section>

                <Text className='text-base text-gray-800 mb-4'>
                  Please change your password as soon as possible:
                </Text>

                <Text className='text-center my-6'>
                  <a
                    href='http://localhost:3000/auth/login'
                    target='_blank'
                    className='text-blue-600 underline hover:text-blue-800'
                  >
                    Click here to login
                  </a>
                </Text>

                <Text className='text-sm text-gray-600 mb-6'>
                  If you didn’t request a password reset, you can safely ignore
                  this email—no changes will be made to your account.
                </Text>
              </Section>

              {/* Footer */}
              <Section className='text-center py-6'>
                <Text className='text-gray-500 text-sm'>
                  &copy; {new Date().getFullYear()} NJBA. All rights reserved.
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
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetUserPasswordEmailTemplate;
