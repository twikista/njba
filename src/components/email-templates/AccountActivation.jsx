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
      <Preview>Activate your NJBA Account</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans'>
          {/* Hero Section */}
          <Section className='bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-lg'>
            <Container className='mx-auto px-6 py-10 text-center'>
              <Heading className='text-3xl font-bold text-white m-0'>
                Nigeria Journal of Business Administration
              </Heading>
              {/* <Text className="text-blue-100 text-lg mt-2 mb-0">
                  Account Activation
                </Text> */}
            </Container>
          </Section>

          {/* Main Content */}
          <Container className='mx-auto px-6 max-w-lg'>
            <Section className='bg-white p-6 rounded-b-lg shadow-sm'>
              <Heading
                as='h2'
                className='text-xl font-semibold text-gray-800 mb-4'
              >
                Welcome to the NJBA Journal Platform!
              </Heading>

              <Text className='text-gray-700 my-4'>Dear {name},</Text>

              <Text className='text-gray-700 my-4'>
                Congratulations! You have been added as an{' '}
                <strong>{role}</strong> to the{' '}
                <strong>NJBA journal platform</strong>. As an {role}, you’ll
                manage the creation, upload, and publishing of articles and
                issues to the NJBA website.
              </Text>

              <Text className='text-gray-700 my-4'>
                Below are your login credentials to access the {role} dashboard:
              </Text>

              <Section className='bg-gray-50 border border-gray-200 rounded-lg p-4 my-6'>
                <Text className='text-gray-700 my-2'>
                  <strong>Email:</strong> {email}
                </Text>
                <Text className='text-gray-700 my-2'>
                  <strong>Password:</strong> {defaultPassword}
                </Text>
                <Text className='text-base text-gray-800 mb-4'>
                  Please activate your account and change your password as soon
                  as possible:
                </Text>
              </Section>

              <Button
                className='bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md text-center no-underline'
                href={url}
              >
                Activate My Account
              </Button>

              <Hr className='border-gray-200 my-6' />
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
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ActivationEmailTemplate;
