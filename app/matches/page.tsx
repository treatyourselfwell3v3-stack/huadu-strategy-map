import Link from 'next/link';
import MatchCard from '../../components/MatchCard';
import { getUsers } from '../../lib/dataStore';
import { findMatches } from '../../lib/matchEngine';

export default async function MatchesPage() {
  const users = await getUsers();
  const matches = findMatches(users);

  return (
    <main>
      <section className="panel">
        <h1 className="title">Auto Matches</h1>
        <p className="subtitle">Two-way compatible swaps generated from HAVE/WANT lists.</p>

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
