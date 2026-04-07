import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { addUser } from '../../lib/dataStore';

export default function PublishPage() {
  async function publishSkill(formData: FormData) {
    'use server';

    const name = String(formData.get('name') ?? '').trim();
    const haveRaw = String(formData.get('have') ?? '');
    const wantRaw = String(formData.get('want') ?? '');

    if (!name) return;

    const have = haveRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const want = wantRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await addUser({ name, have, want });
    revalidatePath('/');
    revalidatePath('/matches');
    revalidatePath('/graph');
  }

  return (
    <main>
      <section className="panel narrow">
        <h1 className="title">Publish Skills</h1>
        <p className="subtitle">Add your profile and exchange preferences.</p>

        <form action={publishSkill} className="form">
          <label>
            Name
            <input name="name" className="input" required />
          </label>

          <label>
            Skills I Have (comma separated)
            <textarea name="have" className="input" rows={3} placeholder="Python, UI Design" required />
          </label>

          <label>
            Skills I Want (comma separated)
            <textarea name="want" className="input" rows={3} placeholder="Video Editing, English" required />
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
