'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import UserCard from '../components/UserCard';
import { getUsers, resetUsers, type UserProfile } from '../lib/dataStore';

export default function HomePage() {
  const [users, setUsers] = useState<UserProfile[]>(() => getUsers());
  const [keyword, setKeyword] = useState('');

  const visibleUsers = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter((user) => {
      const bag = [user.name, ...user.have, ...user.want].join(' ').toLowerCase();
      return bag.includes(normalized);
    });
  }, [users, keyword]);

  return (
    <main>
      <section className="panel">
        <h1 className="title">Skill Swap Platform</h1>
        <p className="subtitle">Create profile, publish skills, auto-match peers, and explore the skill network.</p>

        <nav className="nav-links">
          <Link href="/publish" className="btn-link">
            Publish Skills
          </Link>
          <Link href="/matches" className="btn-link">
            View Matches
          </Link>
          <Link href="/graph" className="btn-link">
            Skill Graph
          </Link>
          <button type="button" className="btn-link btn-secondary" onClick={() => setUsers(getUsers())}>
            Refresh
          </button>
          <button type="button" className="btn-link btn-secondary" onClick={() => setUsers(resetUsers())}>
            Reset Seed Data
          </button>
        </nav>

        <input
          className="input"
          placeholder="Search users or skills"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <h2>
          Community Members ({visibleUsers.length}/{users.length})
        </h2>
        <div className="grid">
          {visibleUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
