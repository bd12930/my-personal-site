import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

// Local fallback for dev/preview
let localDb: DatabaseSync | null = null;

function getLocalDb() {
  if (!localDb) {
    const dbPath = path.resolve(process.cwd(), 'database.sqlite');
    localDb = new DatabaseSync(dbPath);
    localDb.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0
      )
    `);
    seedLocalUsers(localDb);
  }
  return localDb;
}

function hashPassword(password: string, existingSalt?: string) {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function seedLocalUsers(db: DatabaseSync) {
  const defaultUsers = [
    { username: 'budi', isAdmin: true },
    { username: 'mimy', isAdmin: false },
    { username: 'stephen', isAdmin: false },
    { username: 'peter', isAdmin: false },
    { username: 'jacob', isAdmin: false },
    { username: 'shintarini', isAdmin: false },
    { username: 'andy', isAdmin: false },
    { username: 'debora', isAdmin: false },
  ];

  const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?');
  const insertStmt = db.prepare(`
    INSERT INTO users (username, password_hash, salt, is_admin)
    VALUES (?, ?, ?, ?)
  `);

  for (const u of defaultUsers) {
    const row = stmt.get(u.username) as { count: number };
    if (row.count === 0) {
      const { hash, salt } = hashPassword('setiawan');
      insertStmt.run(u.username, hash, salt, u.isAdmin ? 1 : 0);
    }
  }
}

export interface User {
  id: number;
  username: string;
  is_admin: number;
}

// Ensure D1 has default users seeded
export async function seedD1IfNeeded(d1: any) {
  try {
    const { results } = await d1.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?').bind('budi').all();
    if (!results || results[0].count === 0) {
      const defaultUsers = [
        { username: 'budi', isAdmin: true },
        { username: 'mimy', isAdmin: false },
        { username: 'stephen', isAdmin: false },
        { username: 'peter', isAdmin: false },
        { username: 'jacob', isAdmin: false },
        { username: 'shintarini', isAdmin: false },
        { username: 'andy', isAdmin: false },
        { username: 'debora', isAdmin: false },
      ];

      for (const u of defaultUsers) {
        const { hash, salt } = hashPassword('setiawan');
        await d1.prepare(`
          INSERT OR IGNORE INTO users (username, password_hash, salt, is_admin)
          VALUES (?, ?, ?, ?)
        `).bind(u.username, hash, salt, u.isAdmin ? 1 : 0).run();
      }
    }
  } catch (err) {
    // Table might not exist yet, create it
    await d1.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0
      )
    `);
    await seedD1IfNeeded(d1);
  }
}

export async function getUserByUsername(d1: any, username: string) {
  if (d1) {
    await seedD1IfNeeded(d1);
    const row = await d1.prepare('SELECT id, username, password_hash, salt, is_admin FROM users WHERE username = ?').bind(username).first();
    return row;
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('SELECT id, username, password_hash, salt, is_admin FROM users WHERE username = ?');
    return stmt.get(username) as any;
  }
}

export async function getAllUsers(d1: any): Promise<User[]> {
  if (d1) {
    await seedD1IfNeeded(d1);
    const { results } = await d1.prepare('SELECT id, username, is_admin FROM users ORDER BY username ASC').all();
    return results as User[];
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('SELECT id, username, is_admin FROM users ORDER BY username ASC');
    return stmt.all() as User[];
  }
}

export async function updateUserPassword(d1: any, username: string, newPassword: string) {
  const { hash, salt } = hashPassword(newPassword);
  if (d1) {
    await d1.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE username = ?').bind(hash, salt, username).run();
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE username = ?');
    stmt.run(hash, salt, username);
  }
}

export async function createUser(d1: any, username: string, password: string, isAdmin: boolean = false) {
  const { hash, salt } = hashPassword(password);
  if (d1) {
    await d1.prepare('INSERT INTO users (username, password_hash, salt, is_admin) VALUES (?, ?, ?, ?)').bind(username, hash, salt, isAdmin ? 1 : 0).run();
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('INSERT INTO users (username, password_hash, salt, is_admin) VALUES (?, ?, ?, ?)');
    stmt.run(username, hash, salt, isAdmin ? 1 : 0);
  }
}

export async function deleteUser(d1: any, username: string) {
  if (d1) {
    await d1.prepare('DELETE FROM users WHERE username = ?').bind(username).run();
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('DELETE FROM users WHERE username = ?');
    stmt.run(username);
  }
}

export async function updateUsername(d1: any, oldUsername: string, newUsername: string) {
  if (d1) {
    await d1.prepare('UPDATE users SET username = ? WHERE username = ?').bind(newUsername, oldUsername).run();
  } else {
    const db = getLocalDb();
    const stmt = db.prepare('UPDATE users SET username = ? WHERE username = ?');
    stmt.run(newUsername, oldUsername);
  }
}

export async function verifyPassword(d1: any, username: string, password: string): Promise<boolean> {
  const user = await getUserByUsername(d1, username);
  if (!user) return false;
  const { hash } = hashPassword(password, user.salt);
  return hash === user.password_hash;
}
