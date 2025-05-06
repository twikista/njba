import NewUserForm from '@/components/auth/NewUserForm';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';

async function NewUser() {
  return (
    <DashboardLayout>
      <NewUserForm />
    </DashboardLayout>
  );
}

export default NewUser;
