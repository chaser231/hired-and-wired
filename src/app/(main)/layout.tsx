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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-gray-bg)' }}>
      {/* Top Menu - Full Width */}
      <TopMenu
        variant={getMenuVariant()}
        onGenerateReport={() => router.push('/reports')}
        onTeamsClick={() => router.push('/')}
        onTemplatesClick={() => router.push('/templates')}
        onProfileClick={() => router.push('/profile')}
        onLogoutClick={() => console.log('Logout')}
        className="sticky top-0 z-50 bg-[var(--color-white)]"
      />
      
      {/* Page Content */}
      {children}
    </div>
  );
}

