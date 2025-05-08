import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

export default function DashboardLayout({ children, className }) {
  return (
    <main className='relative flex h-screen'>
      <DashboardLeft />
      <DashboardRight className={className}>{children}</DashboardRight>
    </main>
  );
}
