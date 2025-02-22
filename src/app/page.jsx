import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import Main from '@/components/shared/Main';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-1 w-full h-full mx-auto sm:px-4 max-w-7xl'>
        <Main>
          <p className='text-black'>
            Welcome to the Nigerian Journal of Business Administration
          </p>
        </Main>
      </main>
      <Footer />
    </div>
  );
}
