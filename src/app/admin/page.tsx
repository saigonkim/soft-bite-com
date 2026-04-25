'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Comment = {
  id: string;
  post_id: string;
  author: string;
  content: string;
  created_at: string;
  is_hidden: boolean;
};

type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  created_at: string;
  is_hidden: boolean;
  comments?: Comment[];
};

export default function AdminCommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch posts
    const { data: postsData } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsData) {
      // Fetch all comments for these posts
      const { data: commentsData } = await supabase
        .from('community_comments')
        .select('*');

      const postsWithComments = postsData.map((post: Post) => ({
        ...post,
        comments: commentsData?.filter((c: Comment) => c.post_id === post.id) || []
      }));

      setPosts(postsWithComments);
    }
    setLoading(false);
  };

  const togglePostVisibility = async (postId: string, currentHidden: boolean) => {
    const { error } = await supabase
      .from('community_posts')
      .update({ is_hidden: !currentHidden })
      .eq('id', postId);

    if (!error) {
      setPosts(posts.map(p => p.id === postId ? { ...p, is_hidden: !currentHidden } : p));
    }
  };

  const toggleCommentVisibility = async (commentId: string, currentHidden: boolean) => {
    const { error } = await supabase
      .from('community_comments')
      .update({ is_hidden: !currentHidden })
      .eq('id', commentId);

    if (!error) {
      setPosts(posts.map(p => ({
        ...p,
        comments: p.comments?.map(c => c.id === commentId ? { ...c, is_hidden: !currentHidden } : c)
      })));
    }
  };

  if (loading) return <p>데이터 로딩 중...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-6)', color: 'var(--color-primary)' }}>커뮤니티 메시지 관리</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>등록된 게시글이 없습니다.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {/* Post Row */}
              <div style={{ padding: 'var(--spacing-4)', backgroundColor: post.is_hidden ? 'var(--color-surface-hover)' : 'var(--color-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
                    {post.is_hidden && <span style={{ fontSize: '10px', backgroundColor: '#EF4444', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>숨김됨</span>}
                    <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-base)' }}>{post.title}</span>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: '0 0 var(--spacing-2) 0' }}>{post.content}</p>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    작성자: {post.author} | {new Date(post.created_at).toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => togglePostVisibility(post.id, post.is_hidden)}
                  style={{ 
                    padding: 'var(--spacing-2) var(--spacing-4)', 
                    fontSize: 'var(--font-size-sm)', 
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: post.is_hidden ? 'var(--color-primary)' : '#EF4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {post.is_hidden ? '숨김 해제' : '숨기기'}
                </button>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-3) var(--spacing-4)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>ㄴ 댓글 ({post.comments.length})</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    {post.comments.map(comment => (
                      <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-2) var(--spacing-3)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-border)', opacity: comment.is_hidden ? 0.6 : 1 }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                            {comment.is_hidden && <span style={{ color: '#EF4444', fontWeight: 'bold' }}>[숨김] </span>}
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{comment.author}: </span>
                            {comment.content}
                          </p>
                        </div>
                        <button 
                          onClick={() => toggleCommentVisibility(comment.id, comment.is_hidden)}
                          style={{ 
                            fontSize: '11px', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            backgroundColor: comment.is_hidden ? 'var(--color-text-secondary)' : '#FCA5A5',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            marginLeft: 'var(--spacing-4)'
                          }}
                        >
                          {comment.is_hidden ? '해제' : '숨김'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
