import Link from 'next/link';
import { getUsers } from '../lib/dataStore';
import UserCard from '../components/UserCard';

export default async function HomePage() {
  const users = await getUsers();

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

        <h2>Community Members</h2>
        <div className="grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
