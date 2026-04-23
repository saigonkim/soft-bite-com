'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Comment = {
  id: string;
  user_id: string;
  thickener_ratio: string;
  custom_tip: string;
  tags: string[];
  created_at: string;
};

export default function CommentsSection({ recipeId }: { recipeId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [tip, setTip] = useState('');
  const [thickener, setThickener] = useState('사용안함');
  const [temperature, setTemperature] = useState('#따뜻하게');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newComment = {
      user_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID for now
      recipe_id: recipeId,
      thickener_ratio: thickener,
      custom_tip: tip,
      tags: [temperature]
    };

    const { error } = await supabase
      .from('comments')
      .insert([newComment]);

    if (error) {
      console.error('Error adding comment:', error);
      alert('리뷰 작성에 실패했습니다.');
    } else {
      setTip('');
      fetchComments(); // Refresh list
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 'var(--spacing-10)', borderTop: '2px solid var(--color-border)', paddingTop: 'var(--spacing-6)' }}>
      <h2>환우 리뷰 및 커스텀 팁</h2>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-8)' }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)' }}>나만의 조리 옵션 공유하기</h3>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>점도증진제 비율</label>
            <select 
              value={thickener} 
              onChange={(e) => setThickener(e.target.value)}
              style={{ fontSize: 'var(--font-size-base)', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)' }}
            >
              <option value="사용안함">사용 안 함</option>
              <option value="1/4포">1/4포</option>
              <option value="1/2포">1/2포</option>
              <option value="1포">1포</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>추천 온도</label>
            <select 
              value={temperature} 
              onChange={(e) => setTemperature(e.target.value)}
              style={{ fontSize: 'var(--font-size-base)', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)' }}
            >
              <option value="#따뜻하게">따뜻하게</option>
              <option value="#실온">실온 (미지근하게)</option>
              <option value="#차갑게">차갑게</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>미각 변화 대응 팁 (선택)</label>
          <textarea 
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="예: 쇠맛이 날 때 레몬즙을 추가하면 좋아요."
            style={{ width: '100%', minHeight: '100px', fontSize: 'var(--font-size-base)', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'white', 
            padding: 'var(--spacing-3) var(--spacing-6)', 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: 'bold', 
            border: 'none', 
            borderRadius: 'var(--radius-md)', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? '등록 중...' : '리뷰 등록하기'}
        </button>
      </form>

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {comments.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>아직 등록된 팁이 없습니다. 첫 번째로 팁을 공유해주세요!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: 'var(--spacing-1) var(--spacing-2)', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
                  점도증진제: {comment.thickener_ratio}
                </span>
                {comment.tags?.map(tag => (
                  <span key={tag} style={{ backgroundColor: 'var(--color-surface-hover)', padding: 'var(--spacing-1) var(--spacing-2)', borderRadius: 'var(--radius-full)', fontSize: 'var(--font-size-sm)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 'var(--font-size-base)', margin: 0 }}>
                {comment.custom_tip || '내용이 없습니다.'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
