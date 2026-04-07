import { promises as fs } from 'fs';
import path from 'path';

export type UserProfile = {
  id: string;
  name: string;
  have: string[];
  want: string[];
};

type UserData = {
  users: UserProfile[];
};

const filePath = path.join(process.cwd(), 'data', 'users.json');

async function readData(): Promise<UserData> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as UserData;
}

async function writeData(data: UserData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getUsers(): Promise<UserProfile[]> {
  const data = await readData();
  return data.users;
}

export async function addUser(user: Omit<UserProfile, 'id'>): Promise<UserProfile> {
  const data = await readData();
  const newUser: UserProfile = {
    id: `u${Date.now()}`,
    name: user.name,
    have: Array.from(new Set(user.have)),
    want: Array.from(new Set(user.want))
  };

  data.users.push(newUser);
  await writeData(data);
  return newUser;
}

export async function addSkill(userId: string, type: 'have' | 'want', skill: string): Promise<UserProfile | null> {
  const data = await readData();
  const user = data.users.find((u) => u.id === userId);
  if (!user) return null;

  const normalized = skill.trim();
  if (!normalized) return user;

  if (!user[type].includes(normalized)) {
    user[type].push(normalized);
  }

  await writeData(data);
  return user;
}
