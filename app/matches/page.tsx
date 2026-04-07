'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MatchCard from '../../components/MatchCard';
import { getUsers, type UserProfile } from '../../lib/dataStore';
import { findMatches, type MatchPair } from '../../lib/matchEngine';

export default function MatchesPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [matches, setMatches] = useState<MatchPair[]>([]);

  useEffect(() => {
    const nextUsers = getUsers();
    setUsers(nextUsers);
    setMatches(findMatches(nextUsers));
  }, []);

  return (
    <main>
      <section className="panel">
        <h1 className="title">Auto Matches</h1>
        <p className="subtitle">Two-way compatible swaps generated from HAVE/WANT lists.</p>

        <p className="muted">Users: {users.length} · Matches: {matches.length}</p>
        {matches.length === 0 ? <p className="card">No reciprocal match yet. Add more users and skills.</p> : null}

        <div className="grid">
          {matches.map((match, index) => (
            <MatchCard key={`${match.userA}-${match.userB}-${index}`} match={match} />
          ))}
        </div>

        <Link href="/" className="text-link">
          ← Back Home
        </Link>
      </section>
    </main>
  );
}
