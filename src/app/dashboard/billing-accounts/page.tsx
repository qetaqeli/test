'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function BillingAccountsPage() {
  const supabase = createClientComponentClient();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const { data } = await supabase.from('accounts').select('*').order('created_at', { ascending: false });
      setAccounts(data || []);
    };

    fetchAccounts();

    const channel = supabase
      .channel('realtime-accounts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'accounts' }, () => {
        fetchAccounts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Billing & Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-zinc-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Account #</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Platform</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc.id} className="border-t border-zinc-700">
                  <td className="px-4 py-2">{acc.account_number}</td>
                  <td className="px-4 py-2">${acc.account_size}</td>
                  <td className="px-4 py-2">{acc.platform}</td>
                  <td className="px-4 py-2">{new Date(acc.start_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{acc.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
