import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '@/lib/data';
import { validatePassword } from '@/lib/helper';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log('credentials', credentials);
        try {
          const user = await getUser(credentials.email);
          console.log('user', user);
          const parsedUser = JSON.parse(JSON.stringify(user));
          if (!user) {
            throw new Error('invalid credentials');
          }

          if (!user.isActivated) {
            throw new Error('Account is not activated');
          }

          const isPasswordValid = await validatePassword(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error('Incorrect email or password');

          const { password, ...userWithoutPassword } = parsedUser;
          return userWithoutPassword;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
