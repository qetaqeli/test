"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  created_at: string;
  user_metadata?: { role?: string; banned?: boolean };
};

function CreateUserForm({ onUserCreated }: { onUserCreated: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/users/create", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create user");
      return;
    }

    setEmail("");
    setPassword("");
    setRole("user");
    onUserCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-[#0f172a] rounded-xl shadow-lg mb-8 max-w-md"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-3 rounded-lg bg-[#152046] border border-[#1c2541] text-white focus:outline-none"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-3 rounded-lg bg-[#152046] border border-[#1c2541] text-white focus:outline-none"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-[#152046] border border-[#1c2541] text-white focus:outline-none"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg w-full transition"
      >
        Create User
      </button>
    </form>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");
  const [editPassword, setEditPassword] = useState("");
  const [editBanned, setEditBanned] = useState(false);
  const [editError, setEditError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/u");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(Array.isArray(data.users?.users) ? data.users.users : []);
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function openEditModal(user: User) {
    setEditingUser(user);
    setEditEmail(user.email);
    setEditRole(user.user_metadata?.role || "user");
    setEditPassword("");
    setEditBanned(!!user.user_metadata?.banned);
    setEditError("");
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    setEditError("");

    if (!editingUser) return;

    const res = await fetch("/api/admin/users/update", {
      method: "POST",
      body: JSON.stringify({
        id: editingUser.id,
        email: editEmail,
        role: editRole,
        password: editPassword || undefined,
        banned: editBanned,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setEditError(data.error || "Failed to update user");
      return;
    }

    setEditingUser(null);
    fetchUsers();
  }

  if (loading) return <p className="text-white p-6">Loading users...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error}</p>;

  return (
    <div className="ml-64 min-h-screen p-6 bg-gradient-to-b from-[#081019] via-[#101826] to-[#0f172a] text-white">
      <h1 className="text-3xl font-semibold mb-6">Admin Panel – All Users</h1>

      <CreateUserForm onUserCreated={fetchUsers} />

      <div className="overflow-auto rounded-xl shadow-lg border border-[#1c1f2e] bg-[#0f172a]">
        <table className="w-full text-sm text-left table-auto text-white">
          <thead className="bg-[#121e3a] text-green-400">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Banned</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#1a2544] hover:bg-[#152046]"
              >
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.user_metadata?.role || "user"}</td>
                <td className="px-4 py-2">{user.user_metadata?.banned ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateUser}
            className="bg-[#0f172a] p-6 rounded-xl max-w-md w-full space-y-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold">Edit User</h2>

            <label className="block">
              <span>Email</span>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
                className="input"
              />
            </label>

            <label className="block">
              <span>Role</span>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="input"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <label className="block">
              <span>New Password (leave empty to keep current)</span>
              <input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                className="input"
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editBanned}
                onChange={(e) => setEditBanned(e.target.checked)}
              />
              <span>Ban User</span>
            </label>

            {editError && <p className="text-red-500">{editError}</p>}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
