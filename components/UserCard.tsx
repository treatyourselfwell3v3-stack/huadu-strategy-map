import type { UserProfile } from '../lib/dataStore';
import SkillCard from './SkillCard';

type UserCardProps = {
  user: UserProfile;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <article className="card user-card">
      <h3>{user.name}</h3>
      <p className="muted">ID: {user.id}</p>

      <div>
        <strong>Skills I Have</strong>
        <div className="tags">
          {user.have.map((skill) => (
            <SkillCard key={`${user.id}-have-${skill}`} skill={skill} tone="have" />
          ))}
        </div>
      </div>

      <div>
        <strong>Skills I Want</strong>
        <div className="tags">
          {user.want.map((skill) => (
            <SkillCard key={`${user.id}-want-${skill}`} skill={skill} tone="want" />
          ))}
        </div>
      </div>
    </article>
  );
}
