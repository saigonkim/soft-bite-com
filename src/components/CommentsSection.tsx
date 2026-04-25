'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import Link from 'next/link';

type Comment = {
  id: string;
  user_id: string;
  thickener_ratio: string;
  custom_tip: string;
  tags: string[];
  created_at: string;
  is_hidden: boolean;
};

export default function CommentsSection({ recipeId }: { recipeId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mode, setMode] = useState<'cheer' | 'tip'>('cheer');
  const [content, setContent] = useState('');
  const [thickener, setThickener] = useState('사용안함');
  const [temperature, setTemperature] = useState('#따뜻하게');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchComments();
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [recipeId]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const authorName = user?.user_metadata?.nickname || '익명 환우';
    const finalTags = mode === 'tip' ? [temperature] : [];
    finalTags.push(`AUTHOR:${authorName}`);

    const newComment = {
      user_id: user ? user.id : '00000000-0000-0000-0000-000000000000',
      recipe_id: recipeId,
      thickener_ratio: mode === 'tip' ? thickener : null,
      custom_tip: content,
      tags: finalTags
    };

    const { error } = await supabase
      .from('comments')
      .insert([newComment]);

    if (error) {
      console.error('Error adding comment:', error);
      alert('등록에 실패했습니다.');
    } else {
      setContent('');
      fetchComments(); // Refresh list
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 'var(--spacing-10)', borderTop: '2px solid var(--color-border)', paddingTop: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-primary)', marginBottom: 'var(--spacing-6)' }}>환우 소통 공간</h2>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-8)', border: '1px solid var(--color-border)' }}>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-6)' }}>
          <button
            type="button"
            onClick={() => setMode('cheer')}
            style={{
              flex: 1,
              padding: 'var(--spacing-3)',
              backgroundColor: mode === 'cheer' ? 'var(--color-primary)' : 'var(--color-surface-hover)',
              color: mode === 'cheer' ? 'white' : 'var(--color-text-primary)',
              border: mode === 'cheer' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            응원의 한마디 남기기
          </button>
          <button
            type="button"
            onClick={() => setMode('tip')}
            style={{
              flex: 1,
              padding: 'var(--spacing-3)',
              backgroundColor: mode === 'tip' ? 'var(--color-primary)' : 'var(--color-surface-hover)',
              color: mode === 'tip' ? 'white' : 'var(--color-text-primary)',
              border: mode === 'tip' ? 'none' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            나만의 조리 팁 공유하기
          </button>
        </div>

        {mode === 'tip' && (
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)', flexWrap: 'wrap', backgroundColor: 'var(--color-background)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>점도증진제 비율</label>
              <select 
                value={thickener} 
                onChange={(e) => setThickener(e.target.value)}
                style={{ fontSize: 'var(--font-size-base)', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
              >
                <option value="사용안함">사용 안 함</option>
                <option value="1/4포">1/4포</option>
                <option value="1/2포">1/2포</option>
                <option value="1포">1포</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)' }}>추천 온도</label>
              <select 
                value={temperature} 
                onChange={(e) => setTemperature(e.target.value)}
                style={{ fontSize: 'var(--font-size-base)', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
              >
                <option value="#따뜻하게">따뜻하게</option>
                <option value="#실온">실온 (미지근하게)</option>
                <option value="#차갑게">차갑게</option>
              </select>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={mode === 'cheer' ? "따뜻한 응원이나 감사 인사를 남겨주세요." : "예: 쇠맛이 날 때 레몬즙을 추가하면 좋아요. 이렇게 갈아먹으니 편했어요."}
            style={{ width: '100%', minHeight: '100px', fontSize: 'var(--font-size-base)', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', resize: 'vertical' }}
            required
          />
        </div>

        {user ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              disabled={loading || !content.trim()}
              style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'white', 
                padding: 'var(--spacing-3) var(--spacing-6)', 
                fontSize: 'var(--font-size-base)', 
                fontWeight: 'bold', 
                border: 'none', 
                borderRadius: 'var(--radius-md)', 
                cursor: (loading || !content.trim()) ? 'not-allowed' : 'pointer',
                opacity: (loading || !content.trim()) ? 0.6 : 1
              }}
            >
              {loading ? '등록 중...' : '등록하기'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', backgroundColor: 'var(--color-surface-hover)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <p style={{ margin: '0 0 var(--spacing-2) 0', color: 'var(--color-text-muted)' }}>로그인 후 응원의 한마디와 팁을 남길 수 있습니다.</p>
            <Link href="/mykitchen" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>로그인하러 가기</Link>
          </div>
        )}
      </form>

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {comments.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--spacing-6)' }}>아직 등록된 글이 없습니다. 첫 번째로 글을 남겨주세요!</p>
        ) : (
          comments.map(comment => {
            const authorTag = comment.tags?.find(t => t.startsWith('AUTHOR:'));
            const displayAuthor = authorTag ? authorTag.replace('AUTHOR:', '') : '익명 환우';
            const displayTags = comment.tags?.filter(t => !t.startsWith('AUTHOR:')) || [];

            return (
              <div key={comment.id} style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)' }}>
                {comment.thickener_ratio && (
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
                      💡 조리 팁
                    </span>
                    <span style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)' }}>
                      점도증진제: {comment.thickener_ratio}
                    </span>
                    {displayTags.map(tag => (
                      <span key={tag} style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {!comment.thickener_ratio && (
                  <div style={{ marginBottom: 'var(--spacing-3)' }}>
                    <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
                      💖 응원
                    </span>
                  </div>
                )}
                <p style={{ fontSize: 'var(--font-size-base)', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, color: 'var(--color-text-primary)' }}>
                  {comment.custom_tip}
                </p>
                <div style={{ marginTop: 'var(--spacing-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'right' }}>
                  {displayAuthor} • {new Date(comment.created_at).toLocaleDateString()}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
