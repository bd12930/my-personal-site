import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0
  )
`);

// Helper to hash password
export function hashPassword(password: string, existingSalt?: string) {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

// Seed initial users if not already present
export function seedUsers() {
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

seedUsers();

export interface User {
  id: number;
  username: string;
  is_admin: number;
}

export function getUserByUsername(username: string): (User & { password_hash: string; salt: string }) | undefined {
  const stmt = db.prepare('SELECT id, username, password_hash, salt, is_admin FROM users WHERE username = ?');
  return stmt.get(username) as any;
}

export function getAllUsers(): User[] {
  const stmt = db.prepare('SELECT id, username, is_admin FROM users ORDER BY username ASC');
  return stmt.all() as User[];
}

export function updateUserPassword(username: string, newPassword: string) {
  const { hash, salt } = hashPassword(newPassword);
  const stmt = db.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE username = ?');
  stmt.run(hash, salt, username);
}

export function createUser(username: string, password: string, isAdmin: boolean = false) {
  const { hash, salt } = hashPassword(password);
  const stmt = db.prepare('INSERT INTO users (username, password_hash, salt, is_admin) VALUES (?, ?, ?, ?)');
  stmt.run(username, hash, salt, isAdmin ? 1 : 0);
}

export function deleteUser(username: string) {
  // Prevent deleting the main admin budi if desired, or allow delete
  const stmt = db.prepare('DELETE FROM users WHERE username = ?');
  stmt.run(username);
}

export function updateUsername(oldUsername: string, newUsername: string) {
  const stmt = db.prepare('UPDATE users SET username = ? WHERE username = ?');
  stmt.run(newUsername, oldUsername);
}

export function verifyPassword(username: string, password: string): boolean {
  const user = getUserByUsername(username);
  if (!user) return false;
  const { hash } = hashPassword(password, user.salt);
  return hash === user.password_hash;
}
