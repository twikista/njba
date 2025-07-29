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

export const ActivationEmailTemplate = ({
  name,
  role,
  email,
  url,
  defaultPassword,
  link,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Activate your MSR Account</Preview>
      <Tailwind>
        <Body className='font-sans bg-gray-100'>
          {/* Hero Section */}
          <Section className='rounded-t-lg bg-gradient-to-r from-blue-900 to-blue-700'>
            <Container className='px-6 py-10 mx-auto text-center'>
              <Heading className='m-0 text-3xl font-bold text-white'>
                Management Sciences Review
              </Heading>
              {/* <Text className="mt-2 mb-0 text-lg text-blue-100">
                  Account Activation
                </Text> */}
            </Container>
          </Section>

          {/* Main Content */}
          <Container className='max-w-lg px-6 mx-auto'>
            <Section className='p-6 bg-white rounded-b-lg shadow-sm'>
              <Heading
                as='h2'
                className='mb-4 text-xl font-semibold text-gray-800'
              >
                Welcome to the MSR Journal Platform!
              </Heading>

              <Text className='my-4 text-gray-700'>Dear {name},</Text>

              <Text className='my-4 text-gray-700'>
                Congratulations! You have been added as an{' '}
                <strong>{role}</strong> to the{' '}
                <strong>MSR journal platform</strong>. As an {role}, you’ll
                manage the creation, upload, and publishing of articles and
                issues to the MSR website.
              </Text>

              <Text className='my-4 text-gray-700'>
                Below are your login credentials to access the {role} dashboard:
              </Text>

              <Section className='p-4 my-6 border border-gray-200 rounded-lg bg-gray-50'>
                <Text className='my-2 text-gray-700'>
                  <strong>Email:</strong> {email}
                </Text>
                <Text className='my-2 text-gray-700'>
                  <strong>Password:</strong> {defaultPassword}
                </Text>
                <Text className='mb-4 text-base text-gray-800'>
                  Please activate your account and change your password as soon
                  as possible:
                </Text>
              </Section>

              <Button
                className='px-6 py-3 font-medium text-center text-white no-underline bg-blue-800 rounded-md hover:bg-blue-700'
                href={url}
              >
                Activate My Account
              </Button>

              <Hr className='my-6 border-gray-200' />
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
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ActivationEmailTemplate;
