'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { User, AuthChangeEvent } from '@supabase/supabase-js';

export default function MyKitchenPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [iddsiLevel, setIddsiLevel] = useState('미설정');
  const [scrapedRecipes, setScrapedRecipes] = useState<any[]>([]);
  
  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser || null);
      
      const storedLevel = localStorage.getItem('iddsi_level');
      if (storedLevel) setIddsiLevel(storedLevel);
      
      if (currentUser) {
        const scraps = JSON.parse(localStorage.getItem(`scraps_${currentUser.id}`) || '[]');
        setScrapedRecipes(scraps);
      }
      
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setAuthError(error.message);
    } else {
      if (!nickname.trim()) {
        setAuthError('닉네임을 입력해주세요.');
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: nickname,
          }
        }
      });
      if (error) setAuthError(error.message);
      else {
        // If email confirmation is off, signup logs them in immediately.
        // If it's on, we would tell them to check email. Assuming it's off as planned.
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div>로딩 중...</div>;

  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: 'var(--spacing-8) 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
          {isLogin ? '로그인' : '회원가입'}
        </h1>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontWeight: 'bold' }}>이메일</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontWeight: 'bold' }}>비밀번호</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
            />
          </div>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-2)', fontWeight: 'bold' }}>사용할 닉네임</label>
              <input 
                type="text" 
                value={nickname} 
                onChange={e => setNickname(e.target.value)} 
                required 
                style={{ width: '100%', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} 
              />
            </div>
          )}
          {authError && <p style={{ color: 'var(--color-accent)', fontSize: 'var(--font-size-sm)', margin: 0 }}>{authError}</p>}
          
          <button type="submit" style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'white', 
            padding: 'var(--spacing-3)', 
            border: 'none', 
            borderRadius: 'var(--radius-md)', 
            fontWeight: 'bold', 
            fontSize: 'var(--font-size-lg)',
            cursor: 'pointer',
            marginTop: 'var(--spacing-2)'
          }}>
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: 'var(--spacing-6)' }}>
          {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
          <button 
            onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-primary)', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              marginLeft: 'var(--spacing-2)' 
            }}
          >
            {isLogin ? '회원가입하기' : '로그인하기'}
          </button>
        </p>
      </div>
    );
  }

  const handleRemoveScrap = (recipeId: string) => {
    if (!user) return;
    const newScraps = scrapedRecipes.filter(r => r.id !== recipeId);
    setScrapedRecipes(newScraps);
    localStorage.setItem(`scraps_${user.id}`, JSON.stringify(newScraps));
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-8)", gap: "var(--spacing-4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}>
          <div style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "50%", 
            backgroundColor: "var(--color-primary-light)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "var(--font-size-2xl)"
          }}>
            👨‍🍳
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{user.user_metadata.nickname || '환우'} 님의 키친</h1>
            <p style={{ color: "var(--color-text-muted)", margin: "var(--spacing-1) 0 0 0" }}>현재 설정 단계: <strong>{iddsiLevel}</strong></p>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: 'var(--color-text-primary)'
        }}>
          로그아웃
        </button>
      </div>

      <h2 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--spacing-4)" }}>스크랩한 레시피</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--spacing-6)" }}>
        {scrapedRecipes.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", gridColumn: "1 / -1" }}>아직 스크랩한 레시피가 없습니다.</p>
        ) : (
          scrapedRecipes.map(recipe => (
            <div key={recipe.id} style={{ 
              border: "1px solid var(--color-border)", 
              borderRadius: "var(--radius-lg)", 
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
              position: "relative"
            }}>
              <button 
                onClick={() => handleRemoveScrap(recipe.id)}
                style={{
                position: "absolute",
                top: "var(--spacing-2)",
                right: "var(--spacing-2)",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "var(--shadow-md)"
              }}>
                ❤️
              </button>
              <a href={`/recipes/${recipe.id}`} style={{ display: "block" }}>
                <img src={recipe.image || recipe.image_url} alt={recipe.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <div style={{ padding: "var(--spacing-3)" }}>
                  <h3 style={{ margin: "0 0 var(--spacing-1) 0", fontSize: "var(--font-size-lg)" }}>{recipe.title}</h3>
                  <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "var(--font-size-sm)" }}>{recipe.level}</p>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
