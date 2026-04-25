'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profile?.role === 'admin') {
        setIsAdmin(true);
      }
    }
  };

  // 관리자 페이지 내부에서는 메인 헤더를 숨겨서 관리자용 대시보드 UI를 강조합니다.
  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="header">
      <div className="container headerContainer">
        <Link href="/" className="logo">
          든든한 한입
        </Link>
        <nav className="nav">
          <Link href="/recipes" className="navLink">단계별 레시피</Link>
          <Link href="/guide" className="navLink">식재료 가이드</Link>
          <Link href="/community" className="navLink">환우 커뮤니티</Link>
          <Link href="/mykitchen" className="navLink">마이 키친</Link>
          {isAdmin && (
            <Link 
              href="/admin" 
              className="navLink" 
              style={{ 
                color: 'var(--color-primary)', 
                fontWeight: 'bold',
                borderLeft: '1px solid var(--color-border)',
                paddingLeft: 'var(--spacing-4)',
                marginLeft: 'var(--spacing-2)'
              }}
            >
              관리자
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
