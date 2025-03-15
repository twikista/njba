import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

export default function DashboardLayout({ children }) {
  return (
    <main className='relative flex h-screen'>
      <DashboardLeft />
      <DashboardRight>{children}</DashboardRight>
    </main>
  );
}
