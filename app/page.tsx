'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { getUsers, type UserProfile } from '../lib/dataStore';

export default function HomePage() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

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
        </nav>

        <h2>Community Members ({users.length})</h2>
        <div className="grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
