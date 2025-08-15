'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function RewardsPage() {
  const supabase = createClientComponentClient();
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      const { data } = await supabase.from('rewards').select('*').order('created_at', { ascending: false });
      setRewards(data || []);
    };

    fetchRewards();

    const channel = supabase
      .channel('realtime-rewards')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rewards' }, (payload) => {
        fetchRewards();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Your Rewards</h2>
      {rewards.length === 0 ? (
        <p>No rewards available yet.</p>
      ) : (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="p-4 bg-zinc-800 rounded-lg">
              <p>Equity: ${reward.equity}</p>
              <p>Balance: ${reward.balance}</p>
              <p>Profit: ${reward.profit}</p>
              <p>Status: {reward.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
