'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

type Comment = {
  id: string;
  post_id: string;
  author: string;
  content: string;
  created_at: string;
};

type Post = {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
  comments?: Comment[];
};

function PostItem({ post, onUpdate }: { post: Post, onUpdate: () => void }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    // Check local storage for liked status
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');
    if (likedPosts[post.id]) {
      setLiked(true);
    }
  }, [post.id]);

  const handleLike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '{}');
    const isCurrentlyLiked = !!likedPosts[post.id];
    
    const newLikesCount = isCurrentlyLiked ? likesCount - 1 : likesCount + 1;
    
    // Optimistic UI update
    setLiked(!isCurrentlyLiked);
    setLikesCount(newLikesCount);
    if (!isCurrentlyLiked) {
      likedPosts[post.id] = true;
    } else {
      delete likedPosts[post.id];
    }
    localStorage.setItem('liked_posts', JSON.stringify(likedPosts));

    // Update DB
    await supabase
      .from('community_posts')
      .update({ likes: newLikesCount })
      .eq('id', post.id);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    
    if (data) setComments(data);
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);

    const { error } = await supabase
      .from('community_comments')
      .insert([{ post_id: post.id, author: '익명 환우', content: newComment }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
    setSubmittingComment(false);
  };

  return (
    <div style={{ 
      padding: "var(--spacing-4)", 
      backgroundColor: "var(--color-surface)", 
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)"
    }}>
      <h3 style={{ margin: "0 0 var(--spacing-2) 0" }}>{post.title}</h3>
      <p style={{ margin: "0 0 var(--spacing-3) 0", color: "var(--color-text-secondary)" }}>{post.content}</p>
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        columnGap: "var(--spacing-4)",
        rowGap: "var(--spacing-2)",
        alignItems: "center", 
        fontSize: "var(--font-size-sm)", 
        color: "var(--color-text-muted)",
        marginTop: "var(--spacing-2)",
        paddingTop: "var(--spacing-3)",
        borderTop: "1px solid var(--color-border)"
      }}>
        <span>👤 {post.author}</span>
        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
        <div style={{ flex: 1 }}></div> {/* Spacer to push buttons to the right if there's room */}
        <button 
          onClick={toggleComments}
          style={{ 
            background: 'var(--color-surface-hover)', 
            border: 'none', 
            color: 'inherit', 
            cursor: 'pointer', 
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)'
          }}
        >
          💬 댓글
        </button>
        <button 
          onClick={handleLike} 
          style={{ 
            background: liked ? 'var(--color-primary-light)' : 'var(--color-surface-hover)', 
            border: 'none', 
            color: liked ? 'var(--color-accent)' : 'inherit', 
            cursor: 'pointer', 
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-md)',
            fontWeight: liked ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)'
          }}
        >
          {liked ? '❤️' : '🤍'} {likesCount}
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: 'var(--spacing-4)', paddingTop: 'var(--spacing-4)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
            {comments.length === 0 ? (
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>첫 번째 댓글을 남겨보세요!</p>
            ) : (
              comments.map(c => (
                <div key={c.id} style={{ backgroundColor: 'var(--color-background)', padding: 'var(--spacing-2) var(--spacing-3)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-sm)', marginRight: 'var(--spacing-2)' }}>{c.author}</span>
                  <span style={{ fontSize: 'var(--font-size-sm)' }}>{c.content}</span>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <input 
              type="text" 
              placeholder="댓글을 입력하세요..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ flex: 1, padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
            />
            <button 
              type="submit" 
              disabled={submittingComment} 
              style={{ 
                padding: 'var(--spacing-2) var(--spacing-4)', 
                backgroundColor: 'var(--color-primary)', 
                color: 'white', 
                border: 'none', 
                borderRadius: 'var(--radius-md)', 
                cursor: submittingComment ? 'not-allowed' : 'pointer',
                width: 'auto',
                flexShrink: 0,
                fontWeight: 'bold'
              }}
            >
              등록
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const { error } = await supabase
      .from('community_posts')
      .insert([{ author: '익명 환우', title: newTitle, content: newContent }]);

    if (!error) {
      setNewTitle('');
      setNewContent('');
      setShowForm(false);
      fetchPosts();
    } else {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4)", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-6)" }}>
        <div style={{ flex: "1 1 100%" }}>
          <h1 style={{ margin: 0 }}>환우 커뮤니티</h1>
          <p style={{ color: "var(--color-text-muted)", margin: "var(--spacing-2) 0 0 0" }}>
            서로의 경험과 레시피를 나누는 따뜻한 공간입니다.
          </p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            padding: "var(--spacing-3) var(--spacing-6)",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            fontSize: "var(--font-size-lg)"
          }}
        >
          {showForm ? '취소' : '글쓰기'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handlePost} style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-6)' }}>
          <div style={{ marginBottom: 'var(--spacing-3)' }}>
            <input 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ width: '100%', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
            />
          </div>
          <div style={{ marginBottom: 'var(--spacing-3)' }}>
            <textarea 
              placeholder="내용을 입력하세요" 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              style={{ width: '100%', minHeight: '100px', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-2) var(--spacing-4)', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer' }}>
            등록하기
          </button>
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {loading ? <p>로딩 중...</p> : posts.map(post => (
          <PostItem key={post.id} post={post} onUpdate={fetchPosts} />
        ))}
        {!loading && posts.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>등록된 게시글이 없습니다.</p>}
      </div>
    </div>
  );
}
