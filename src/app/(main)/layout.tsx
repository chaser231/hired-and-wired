'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { TopMenu } from '@/components/sections/TopMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMenuVariant = () => {
    if (pathname?.startsWith('/templates')) return 'templates';
    return 'all';
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-gray-bg)' }}>
      {/* Top Menu - Fixed position, transparent → white on scroll */}
      <TopMenu
        variant={getMenuVariant()}
        isScrolled={isScrolled}
        onGenerateReport={() => router.push('/reports')}
        onTeamsClick={() => router.push('/')}
        onTemplatesClick={() => router.push('/templates')}
        onProfileClick={() => router.push('/profile')}
        onLogoutClick={() => console.log('Logout')}
        className="fixed top-0 left-0 right-0 z-50"
      />
      
      {/* Page Content */}
      {children}
    </div>
  );
}

