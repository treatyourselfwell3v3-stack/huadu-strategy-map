'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import MatchCard from '../../components/MatchCard';
import { getUsers } from '../../lib/dataStore';
import { findMatches } from '../../lib/matchEngine';

export default function MatchesPage() {
  const [users] = useState(() => getUsers());
  const [skillFilter, setSkillFilter] = useState('');

  const matches = useMemo(() => {
    const all = findMatches(users);
    const normalized = skillFilter.trim().toLowerCase();
    if (!normalized) return all;

    return all.filter((match) =>
      match.exchange.some(
        (item) => item.fromA.toLowerCase().includes(normalized) || item.fromB.toLowerCase().includes(normalized)
      )
    );
  }, [users, skillFilter]);

  return (
    <main>
      <section className="panel">
        <h1 className="title">Auto Matches</h1>
        <p className="subtitle">Two-way compatible swaps generated from HAVE/WANT lists.</p>

        <input
          className="input"
          placeholder="Filter by skill (e.g. Python)"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          style={{ marginBottom: 12 }}
        />

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
