'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/mykitchen');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      alert('관리자 권한이 없습니다.');
      router.push('/');
    }
  };

  if (isAdmin === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--color-background)' }}>
        <p style={{ color: 'var(--color-primary)' }}>관리자 권한 확인 중...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const menuItems = [
    { name: '커뮤니티 관리', path: '/admin' },
    { name: '응원 관리', path: '/admin/cheers' },
    { name: '조리팁 관리', path: '/admin/tips' },
    { name: '회원 관리', path: '/admin/users' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      {/* Admin Header */}
      <header style={{ backgroundColor: 'var(--color-surface)', borderBottom: '2px solid var(--color-primary)', padding: 'var(--spacing-4) var(--spacing-6)', sticky: 'top', zIndex: 1100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
            Soft-Bite Admin <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>v1.0</span>
          </h1>
          <Link href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            메인 사이트로 가기 →
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flex: 1, padding: 'var(--spacing-6)' }}>
        {/* Sidebar */}
        <aside style={{ width: '240px', marginRight: 'var(--spacing-8)' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    padding: 'var(--spacing-3) var(--spacing-4)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isActive ? 'white' : 'var(--color-text-primary)',
                    fontWeight: isActive ? 'bold' : 'normal',
                    border: isActive ? 'none' : '1px solid var(--color-border)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: 'var(--spacing-6)', boxShadow: 'var(--shadow-sm)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
