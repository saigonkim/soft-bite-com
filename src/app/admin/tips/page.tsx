'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Tip = {
  id: string;
  custom_tip: string;
  thickener_ratio: string;
  tags: string[];
  created_at: string;
  is_hidden: boolean;
  recipe_id: string;
};

export default function AdminTipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .filter('thickener_ratio', 'not.is', null)
      .order('created_at', { ascending: false });

    if (data) setTips(data);
    setLoading(false);
  };

  const toggleVisibility = async (id: string, currentHidden: boolean) => {
    const { error } = await supabase
      .from('comments')
      .update({ is_hidden: !currentHidden })
      .eq('id', id);

    if (!error) {
      setTips(tips.map(t => t.id === id ? { ...t, is_hidden: !currentHidden } : t));
    }
  };

  if (loading) return <p>데이터 로딩 중...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)' }}>조리 팁 관리</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {tips.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>등록된 조리 팁이 없습니다.</p>
        ) : (
          tips.map(tip => {
            const authorTag = tip.tags?.find(t => t.startsWith('AUTHOR:'));
            const author = authorTag ? authorTag.replace('AUTHOR:', '') : '익명 환우';
            
            return (
              <div key={tip.id} style={{ 
                padding: 'var(--spacing-4)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: tip.is_hidden ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                    <span style={{ fontSize: '10px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                      점도: {tip.thickener_ratio}
                    </span>
                    {tip.is_hidden && <span style={{ fontSize: '10px', backgroundColor: '#EF4444', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>숨김됨</span>}
                  </div>
                  <p style={{ margin: '0 0 var(--spacing-2) 0', fontSize: 'var(--font-size-base)', opacity: tip.is_hidden ? 0.6 : 1 }}>
                    {tip.custom_tip}
                  </p>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    작성자: {author} | 레시피 ID: {tip.recipe_id} | {new Date(tip.created_at).toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => toggleVisibility(tip.id, tip.is_hidden)}
                  style={{ 
                    padding: 'var(--spacing-2) var(--spacing-4)', 
                    fontSize: 'var(--font-size-sm)', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: tip.is_hidden ? 'var(--color-text-secondary)' : '#EF4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: 'var(--spacing-4)'
                  }}
                >
                  {tip.is_hidden ? '숨김 해제' : '숨기기'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
