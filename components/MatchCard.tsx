import type { MatchPair } from '../lib/matchEngine';

type MatchCardProps = {
  match: MatchPair;
};

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="card">
      <h3>
        {match.userA} ↔ {match.userB}
      </h3>
      <ul>
        {match.exchange.map((item, idx) => (
          <li key={`${match.userA}-${match.userB}-${idx}`}>
            {match.userA} 提供 <strong>{item.fromA}</strong>，{match.userB} 提供 <strong>{item.fromB}</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}
