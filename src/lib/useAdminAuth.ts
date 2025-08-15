// src/lib/useAdminAuth.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';

export function useAdminAuth() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session && session.user) {
      const role = session.user.user_metadata?.role;
      if (role !== 'admin') {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [session, router]);
}
