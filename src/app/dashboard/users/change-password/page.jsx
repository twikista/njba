import ChangePassordForm from '@/components/auth/ChangePasswordForm';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import { auth } from '../../../../../auth';

async function NewUser() {
  const user = await auth();
  return (
    <DashboardLayout>
      <ChangePassordForm
        email={JSON.parse(JSON.stringify(user?.user?.email))}
      />
    </DashboardLayout>
  );
}

export default NewUser;
