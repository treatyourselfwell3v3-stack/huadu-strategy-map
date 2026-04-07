import usersData from '../data/users.json';

export type UserProfile = {
  id: string;
  name: string;
  have: string[];
  want: string[];
};

type UserData = {
  users: UserProfile[];
};

const STORAGE_KEY = 'skill_swap_users';

function cloneSeedUsers(): UserProfile[] {
  return usersData.users.map((u) => ({ ...u, have: [...u.have], want: [...u.want] }));
}

function getSeedData(): UserData {
  return { users: cloneSeedUsers() };
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getUsers(): UserProfile[] {
  if (!canUseStorage()) return cloneSeedUsers();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = getSeedData();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed.users;
  }

  try {
    const parsed = JSON.parse(raw) as UserData;
    if (!Array.isArray(parsed.users)) throw new Error('Invalid user data');
    return parsed.users;
  } catch {
    const seed = getSeedData();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed.users;
  }
}

function saveUsers(users: UserProfile[]): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ users }));
}

export function addUser(user: Omit<UserProfile, 'id'>): UserProfile {
  const users = getUsers();
  const newUser: UserProfile = {
    id: `u${Date.now()}`,
    name: user.name.trim(),
    have: Array.from(new Set(user.have.map((s) => s.trim()).filter(Boolean))),
    want: Array.from(new Set(user.want.map((s) => s.trim()).filter(Boolean)))
  };

  const next = [...users, newUser];
  saveUsers(next);
  return newUser;
}

export function addSkill(userId: string, type: 'have' | 'want', skill: string): UserProfile | null {
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const normalized = skill.trim();
  if (!normalized) return user;

  if (!user[type].includes(normalized)) {
    user[type].push(normalized);
  }

  saveUsers(users);
  return user;
}
