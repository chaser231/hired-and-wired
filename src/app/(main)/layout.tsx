'use client';

import { useRouter, usePathname } from 'next/navigation';
import { TopMenu } from '@/components/sections/TopMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getMenuVariant = () => {
    if (pathname?.startsWith('/templates')) return 'templates';
    return 'all';
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-gray-bg)' }}>
      {/* Top Menu - Absolute positioned over content */}
      <TopMenu
        variant={getMenuVariant()}
        onGenerateReport={() => router.push('/reports')}
        onTeamsClick={() => router.push('/')}
        onTemplatesClick={() => router.push('/templates')}
        onProfileClick={() => router.push('/profile')}
        onLogoutClick={() => console.log('Logout')}
        className="absolute top-0 left-0 right-0 z-50"
      />
      
      {/* Page Content */}
      {children}
    </div>
  );
}

