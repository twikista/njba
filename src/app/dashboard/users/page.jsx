import { getUsers, removeUser, resetUserPassowrd } from '@/lib/actions/auth';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import { default as CreateButton } from '@/components/buttons/AddButton';
import DeleteButton from '@/components/buttons/DeleteButton';

async function AdminPage() {
  const response = await getUsers();

  return (
    <DashboardLayout>
      <div className='flex flex-row-reverse items-center justify-between pb-3 border-200'>
        <CreateButton href='/dashboard/users/new-user' label='Add New User' />
      </div>
      <div className='p-2 bg-secondary rounded-lg md:pt-0 overflow-x-auto'>
        <table className='min-w-full overflow-x-scroll'>
          <thead className='rounded-lg'>
            <tr className='text-white'>
              <th className='px-4 py-6 pb-1 font-medium w-[20px]'>S/N</th>
              <th className='px-4 pt-4 pb-1 table-fixed'>Name</th>
              <th className='px-4 pt-4 pb-1 font-medium w-14'>Email</th>
              <th className='px-4 pt-4 pb-1 font-medium'>Role</th>
              <th className='sr-only'></th>
              <th className='sr-only'></th>
            </tr>
          </thead>
          <tbody className='text-center bg-white divide-y-2 rounded-sm'>
            {response?.users.map((user, index) => (
              <tr className='py-5 text-sm' key={user?.email}>
                <td className='px-4 py-4 border border-solid'>{`${
                  index + 1
                }.`}</td>
                <td className='px-4 py-4 text-left border border-solid'>
                  {`${user?.firstName} ${user?.lastName ? user.lastName : ''}`}
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  {user?.email}
                </td>
                <td className='px-4 py-4 text-center capitalize border border-solid'>
                  {user.role}
                </td>
                <td className='px-4 py-4 text-center w-fit'>
                  <div className='flex gap-4 justify-center w-fit'>
                    {user.role !== 'admin' && (
                      <DeleteButton
                        action={removeUser}
                        id={user._id}
                        label='Remove'
                        variant='primary'
                        icon={false}
                        className={user.role === 'admin' ? 'hidden' : ''}
                      />
                    )}
                    {user.role !== 'admin' && (
                      <DeleteButton
                        action={resetUserPassowrd}
                        successMessage='User reset successful!'
                        id={user?.email}
                        label='Reset passowrd'
                        altLabel='Processing...'
                        variant='primary'
                        icon={false}
                        className={user.role === 'admin' ? 'hidden' : ''}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default AdminPage;
