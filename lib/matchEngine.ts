import type { UserProfile } from './dataStore';

export type MatchPair = {
  userA: string;
  userB: string;
  exchange: Array<{
    fromA: string;
    fromB: string;
  }>;
};

export function findMatches(users: UserProfile[]): MatchPair[] {
  const matches: MatchPair[] = [];

  for (let i = 0; i < users.length; i += 1) {
    for (let j = i + 1; j < users.length; j += 1) {
      const a = users[i];
      const b = users[j];

      const aToB = a.have.filter((skill) => b.want.includes(skill));
      const bToA = b.have.filter((skill) => a.want.includes(skill));

      if (aToB.length && bToA.length) {
        const exchange = aToB.flatMap((fromA) => bToA.map((fromB) => ({ fromA, fromB })));

        matches.push({
          userA: a.name,
          userB: b.name,
          exchange
        });
      }
    }
  }

  return matches;
}
