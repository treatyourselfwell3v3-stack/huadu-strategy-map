'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { addUser } from '../../lib/dataStore';

export default function PublishPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [have, setHave] = useState('');
  const [want, setWant] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedHave = have
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedWant = want
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!name.trim() || !parsedHave.length || !parsedWant.length) return;

    addUser({
      name: name.trim(),
      have: parsedHave,
      want: parsedWant
    });

    router.push('/matches');
  }

  return (
    <main>
      <section className="panel narrow">
        <h1 className="title">Publish Skills</h1>
        <p className="subtitle">Add your profile and exchange preferences.</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" required />
          </label>

          <label>
            Skills I Have (comma separated)
            <textarea
              value={have}
              onChange={(e) => setHave(e.target.value)}
              className="input"
              rows={3}
              placeholder="Python, UI Design"
              required
            />
          </label>

          <label>
            Skills I Want (comma separated)
            <textarea
              value={want}
              onChange={(e) => setWant(e.target.value)}
              className="input"
              rows={3}
              placeholder="Video Editing, English"
              required
            />
          </label>

          <button type="submit" className="btn-primary">
            Save Profile
          </button>
        </form>

        <Link href="/" className="text-link">
          ← Back Home
        </Link>
      </section>
    </main>
  );
}
