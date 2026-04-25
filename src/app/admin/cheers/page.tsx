'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Cheer = {
  id: string;
  custom_tip: string;
  tags: string[];
  created_at: string;
  is_hidden: boolean;
  recipe_id: string;
};

export default function AdminCheersPage() {
  const [cheers, setCheers] = useState<Cheer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .is('thickener_ratio', null)
      .order('created_at', { ascending: false });

    if (data) setCheers(data);
    setLoading(false);
  };

  const toggleVisibility = async (id: string, currentHidden: boolean) => {
    const { error } = await supabase
      .from('comments')
      .update({ is_hidden: !currentHidden })
      .eq('id', id);

    if (!error) {
      setCheers(cheers.map(c => c.id === id ? { ...c, is_hidden: !currentHidden } : c));
    }
  };

  if (loading) return <p>데이터 로딩 중...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)' }}>응원 메시지 관리</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {cheers.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>등록된 응원 메시지가 없습니다.</p>
        ) : (
          cheers.map(cheer => {
            const authorTag = cheer.tags?.find(t => t.startsWith('AUTHOR:'));
            const author = authorTag ? authorTag.replace('AUTHOR:', '') : '익명 환우';
            
            return (
              <div key={cheer.id} style={{ 
                padding: 'var(--spacing-4)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: cheer.is_hidden ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-base)', opacity: cheer.is_hidden ? 0.6 : 1 }}>
                    {cheer.is_hidden && <span style={{ color: '#EF4444', fontWeight: 'bold' }}>[숨김] </span>}
                    {cheer.custom_tip}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    작성자: {author} | 레시피 ID: {cheer.recipe_id} | {new Date(cheer.created_at).toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => toggleVisibility(cheer.id, cheer.is_hidden)}
                  style={{ 
                    padding: 'var(--spacing-2) var(--spacing-4)', 
                    fontSize: 'var(--font-size-sm)', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: cheer.is_hidden ? 'var(--color-text-secondary)' : '#EF4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: 'var(--spacing-4)'
                  }}
                >
                  {cheer.is_hidden ? '숨김 해제' : '숨기기'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
