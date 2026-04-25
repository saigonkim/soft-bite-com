'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Profile = {
  id: string;
  email: string;
  nickname: string;
  role: string;
  created_at: string;
};

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProfiles(data);
    setLoading(false);
  };

  const toggleAdmin = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);

    if (!error) {
      setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
    }
  };

  if (loading) return <p>데이터 로딩 중...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)' }}>회원 관리</h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-3)', textAlign: 'left' }}>이메일</th>
              <th style={{ padding: 'var(--spacing-3)', textAlign: 'left' }}>닉네임</th>
              <th style={{ padding: 'var(--spacing-3)', textAlign: 'left' }}>권한</th>
              <th style={{ padding: 'var(--spacing-3)', textAlign: 'left' }}>가입일</th>
              <th style={{ padding: 'var(--spacing-3)', textAlign: 'center' }}>액션</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: 'var(--spacing-3)' }}>{profile.email}</td>
                <td style={{ padding: 'var(--spacing-3)' }}>{profile.nickname || '익명'}</td>
                <td style={{ padding: 'var(--spacing-3)' }}>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: 'bold',
                    backgroundColor: profile.role === 'admin' ? '#FEE2E2' : 'var(--color-surface-hover)',
                    color: profile.role === 'admin' ? '#991B1B' : 'var(--color-text-secondary)'
                  }}>
                    {profile.role}
                  </span>
                </td>
                <td style={{ padding: 'var(--spacing-3)', color: 'var(--color-text-muted)' }}>
                  {new Date(profile.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: 'var(--spacing-3)', textAlign: 'center' }}>
                  <button 
                    onClick={() => toggleAdmin(profile.id, profile.role)}
                    style={{ 
                      fontSize: '11px', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    {profile.role === 'admin' ? '일반전환' : '관리자지정'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
