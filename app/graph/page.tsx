'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SkillGraph from '../../components/SkillGraph';
import { getUsers, type UserProfile } from '../../lib/dataStore';

export default function GraphPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

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
