import { verifyJWT } from '@/lib/helper';
import AccountActivationForm from '@/components/auth/AccountActivationForm';

export const metadata = {
  title: 'Account Activation',
  description: 'Activate your account',
  robots: 'noindex, nofollow',
};

async function AccountActivation({ params }) {
  const param = await params;
  const idToken = param.id;
  const { expired: isTokenExpired } = verifyJWT(idToken);
  if (isTokenExpired) {
    return (
      <div>
        <p>
          Your activation link has expired. Please contact the site
          administrator.
        </p>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center w-full border'>
      <AccountActivationForm id={param.id} />
    </div>
  );
}

export default AccountActivation;
