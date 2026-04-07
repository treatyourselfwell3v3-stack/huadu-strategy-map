import Link from 'next/link';
import SkillGraph from '../../components/SkillGraph';
import { getUsers } from '../../lib/dataStore';

export default async function GraphPage() {
  const users = await getUsers();

  return (
    <main>
      <section className="panel">
        <h1 className="title">Skill Network Graph</h1>
        <p className="subtitle">User nodes connect to skills by HAVE and WANT relationships.</p>

        <SkillGraph users={users} />

        <Link href="/" className="text-link">
          ← Back Home
        </Link>
      </section>
    </main>
  );
}
