// src/app/layout.tsx
import './globals.css';
import SupabaseProvider from '@/components/SupabaseProvider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
