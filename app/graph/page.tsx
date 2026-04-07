'use client';

import Link from 'next/link';
import { useState } from 'react';
import SkillGraph from '../../components/SkillGraph';
import { getUsers } from '../../lib/dataStore';

export default function GraphPage() {
  const [users] = useState(() => getUsers());

  return (
    <main>
      <section className="panel">
        <h1 className="title">Skill Network Graph</h1>
        <p className="subtitle">User nodes connect to skills by HAVE and WANT relationships.</p>
        <p className="muted">Blue links = HAVE, Orange links = WANT.</p>

        <SkillGraph users={users} />

        <Link href="/" className="text-link">
          ← Back Home
        </Link>
      </section>
    </main>
  );
}
