'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function ScrapButton({ recipe }: { recipe: any }) {
  const [isScraped, setIsScraped] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkUserAndScrap();
  }, [recipe.id]);

  const checkUserAndScrap = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const currentUser = session?.user;
    setUser(currentUser || null);

    if (currentUser) {
      const scraps = JSON.parse(localStorage.getItem(`scraps_${currentUser.id}`) || '[]');
      setIsScraped(scraps.some((r: any) => r.id === recipe.id));
    }
  };

  const handleScrap = () => {
    if (!user) {
      alert('로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다.');
      router.push('/mykitchen');
      return;
    }

    const scraps = JSON.parse(localStorage.getItem(`scraps_${user.id}`) || '[]');
    let newScraps;
    
    if (isScraped) {
      newScraps = scraps.filter((r: any) => r.id !== recipe.id);
    } else {
      newScraps = [...scraps, recipe];
    }
    
    localStorage.setItem(`scraps_${user.id}`, JSON.stringify(newScraps));
    setIsScraped(!isScraped);
  };

  return (
    <button 
      onClick={handleScrap}
      style={{ 
        padding: "10px 20px", 
        backgroundColor: isScraped ? "var(--color-primary-light)" : "var(--color-surface-hover)", 
        color: isScraped ? "var(--color-primary-dark)" : "var(--color-text-primary)", 
        border: "1px solid var(--color-border)", 
        borderRadius: "var(--radius-full)", 
        cursor: "pointer", 
        fontWeight: "bold" 
      }}
    >
      {isScraped ? '🔖 스크랩 취소' : '🔖 스크랩하기'}
    </button>
  );
}
