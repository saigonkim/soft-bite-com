import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Create a single supabase client, or a dummy client if env is missing
export const supabase = isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      from: () => ({
        select: () => ({
          eq: () => ({
            order: async () => ({ data: [], error: null })
          })
        }),
        insert: async () => {
          alert("현재 데이터베이스가 연결되어 있지 않아 리뷰를 저장할 수 없습니다.");
          return { error: null };
        }
      })
    } as any);
