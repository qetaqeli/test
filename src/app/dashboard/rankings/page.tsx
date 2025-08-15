'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function RankingsPage() {
  const supabase = createClientComponentClient();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const { data } = await supabase.from('rankings').select('*').order('gain', { ascending: false });
      setRankings(data || []);
    };

    fetchInitial();

    const channel = supabase
      .channel('realtime-rankings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rankings' }, (payload) => {
        fetchInitial(); // Refresh after any update
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Live Rankings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankings.map((trader) => (
          <div key={trader.id} className="p-4 bg-zinc-900 rounded-lg shadow">
            <p><strong>{trader.username}</strong> ({trader.country})</p>
            <p>Profit: ${trader.profit}</p>
            <p>Gain: {trader.gain}%</p>
            <p>Account Size: ${trader.account_size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
