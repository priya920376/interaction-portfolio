import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 text-zinc-900 font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
