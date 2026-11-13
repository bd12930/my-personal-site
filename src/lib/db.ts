import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { env } from 'cloudflare:workers';

function getD1(d1?: any) {
  return d1 || (env as any)?.DB;
}

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
        is_admin INTEGER NOT NULL DEFAULT 0,
        preferred_lang TEXT NOT NULL DEFAULT 'en'
      );
      CREATE TABLE IF NOT EXISTS check_ins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        state_of_mind TEXT NOT NULL,
        struggle TEXT NOT NULL,
        count_blessing TEXT NOT NULL,
        prayer_request TEXT NOT NULL,
        aob TEXT,
        devotion_title TEXT,
        devotion_passage TEXT,
        devotion_text TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
      CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at);
    `);
    try {
      localDb.exec("ALTER TABLE users ADD COLUMN preferred_lang TEXT NOT NULL DEFAULT 'en';");
    } catch {}
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
  preferred_lang?: string;
}

// Ensure D1 has default users seeded
let isD1Seeded = false;

export async function seedD1IfNeeded(d1: any) {
  if (isD1Seeded) return;
  try {
    await d1.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0,
        preferred_lang TEXT NOT NULL DEFAULT 'en'
      )
    `).run();

    try {
      await d1.prepare("ALTER TABLE users ADD COLUMN preferred_lang TEXT NOT NULL DEFAULT 'en'").run();
    } catch {}

    await d1.prepare(`
      CREATE TABLE IF NOT EXISTS check_ins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        state_of_mind TEXT NOT NULL,
        struggle TEXT NOT NULL,
        count_blessing TEXT NOT NULL,
        prayer_request TEXT NOT NULL,
        aob TEXT,
        devotion_title TEXT,
        devotion_passage TEXT,
        devotion_text TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `).run();

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
    isD1Seeded = true;
  } catch (err) {
    console.error('Failed to initialize or seed D1:', err);
  }
}

export async function getUserByUsername(d1: any, username: string) {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const row = await db.prepare('SELECT id, username, password_hash, salt, is_admin, preferred_lang FROM users WHERE username = ?').bind(username).first();
    return row;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('SELECT id, username, password_hash, salt, is_admin, preferred_lang FROM users WHERE username = ?');
    return stmt.get(username) as any;
  }
}

export async function getAllUsers(d1: any): Promise<User[]> {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const { results } = await db.prepare('SELECT id, username, is_admin, preferred_lang FROM users ORDER BY username ASC').all();
    return results as User[];
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('SELECT id, username, is_admin, preferred_lang FROM users ORDER BY username ASC');
    return stmt.all() as User[];
  }
}

export async function updateUserPassword(d1: any, username: string, newPassword: string) {
  const { hash, salt } = hashPassword(newPassword);
  const db = getD1(d1);
  if (db) {
    await db.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE username = ?').bind(hash, salt, username).run();
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE username = ?');
    stmt.run(hash, salt, username);
  }
}

export async function updateUserLanguage(d1: any, username: string, lang: string): Promise<boolean> {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const res = await db.prepare('UPDATE users SET preferred_lang = ? WHERE username = ?').bind(lang, username).run();
    return (res?.meta?.changes ?? 0) > 0;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('UPDATE users SET preferred_lang = ? WHERE username = ?');
    const res = stmt.run(lang, username);
    return res.changes > 0;
  }
}

export async function createUser(d1: any, username: string, password: string, isAdmin: boolean = false, preferredLang: string = 'en') {
  const { hash, salt } = hashPassword(password);
  const db = getD1(d1);
  if (db) {
    await db.prepare('INSERT INTO users (username, password_hash, salt, is_admin, preferred_lang) VALUES (?, ?, ?, ?, ?)').bind(username, hash, salt, isAdmin ? 1 : 0, preferredLang).run();
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('INSERT INTO users (username, password_hash, salt, is_admin, preferred_lang) VALUES (?, ?, ?, ?, ?)');
    stmt.run(username, hash, salt, isAdmin ? 1 : 0, preferredLang);
  }
}

export async function deleteUser(d1: any, username: string) {
  const db = getD1(d1);
  if (db) {
    await db.prepare('DELETE FROM users WHERE username = ?').bind(username).run();
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('DELETE FROM users WHERE username = ?');
    stmt.run(username);
  }
}

export async function updateUsername(d1: any, oldUsername: string, newUsername: string) {
  const db = getD1(d1);
  if (db) {
    await db.prepare('UPDATE users SET username = ? WHERE username = ?').bind(newUsername, oldUsername).run();
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('UPDATE users SET username = ? WHERE username = ?');
    stmt.run(newUsername, oldUsername);
  }
}

export async function verifyPassword(d1: any, username: string, password: string): Promise<boolean> {
  const user = await getUserByUsername(d1, username);
  if (!user) return false;
  const { hash } = hashPassword(password, user.salt);
  return hash === user.password_hash;
}

export interface CheckIn {
  id: number;
  user_id: number;
  username: string;
  state_of_mind: string;
  struggle: string;
  count_blessing: string;
  prayer_request: string;
  aob: string | null;
  devotion_title: string | null;
  devotion_passage: string | null;
  devotion_text: string | null;
  created_at: string;
  updated_at: string;
}

export async function createCheckIn(d1: any, data: {
  user_id: number;
  username: string;
  state_of_mind: string;
  struggle: string;
  count_blessing: string;
  prayer_request: string;
  aob?: string | null;
  devotion_title?: string | null;
  devotion_passage?: string | null;
  devotion_text?: string | null;
  created_at?: string;
}): Promise<number> {
  const db = getD1(d1);
  const now = data.created_at || new Date().toISOString();
  const aob = data.aob || '';
  const devTitle = data.devotion_title || null;
  const devPassage = data.devotion_passage || null;
  const devText = data.devotion_text || null;

  if (db) {
    await seedD1IfNeeded(db);
    const result = await db.prepare(`
      INSERT INTO check_ins (
        user_id, username, state_of_mind, struggle, count_blessing, prayer_request,
        aob, devotion_title, devotion_passage, devotion_text, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.user_id,
      data.username,
      data.state_of_mind,
      data.struggle,
      data.count_blessing,
      data.prayer_request,
      aob,
      devTitle,
      devPassage,
      devText,
      now,
      now
    ).run();
    return result?.meta?.last_row_id || 0;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare(`
      INSERT INTO check_ins (
        user_id, username, state_of_mind, struggle, count_blessing, prayer_request,
        aob, devotion_title, devotion_passage, devotion_text, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const res = stmt.run(
      data.user_id,
      data.username,
      data.state_of_mind,
      data.struggle,
      data.count_blessing,
      data.prayer_request,
      aob,
      devTitle,
      devPassage,
      devText,
      now,
      now
    );
    return Number(res.lastInsertRowid);
  }
}

export async function getCheckIns(d1: any, limit: number = 100): Promise<CheckIn[]> {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const { results } = await db.prepare(
      'SELECT * FROM check_ins ORDER BY created_at DESC, id DESC LIMIT ?'
    ).bind(limit).all();
    return (results || []) as CheckIn[];
  } else {
    const local = getLocalDb();
    const stmt = local.prepare(
      'SELECT * FROM check_ins ORDER BY created_at DESC, id DESC LIMIT ?'
    );
    return stmt.all(limit) as unknown as CheckIn[];
  }
}

export async function getCheckInById(d1: any, id: number): Promise<CheckIn | null> {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const row = await db.prepare('SELECT * FROM check_ins WHERE id = ?').bind(id).first();
    return (row as CheckIn) || null;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('SELECT * FROM check_ins WHERE id = ?');
    return (stmt.get(id) as unknown as CheckIn) || null;
  }
}

export async function updateCheckIn(
  d1: any,
  id: number,
  user_id: number,
  data: {
    state_of_mind: string;
    struggle: string;
    count_blessing: string;
    prayer_request: string;
    aob?: string | null;
  }
): Promise<boolean> {
  const db = getD1(d1);
  const now = new Date().toISOString();
  const aob = data.aob ?? '';

  if (db) {
    await seedD1IfNeeded(db);
    const res = await db.prepare(`
      UPDATE check_ins
      SET state_of_mind = ?, struggle = ?, count_blessing = ?, prayer_request = ?, aob = ?, updated_at = ?
      WHERE id = ? AND user_id = ?
    `).bind(
      data.state_of_mind,
      data.struggle,
      data.count_blessing,
      data.prayer_request,
      aob,
      now,
      id,
      user_id
    ).run();
    return (res?.meta?.changes ?? 0) > 0;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare(`
      UPDATE check_ins
      SET state_of_mind = ?, struggle = ?, count_blessing = ?, prayer_request = ?, aob = ?, updated_at = ?
      WHERE id = ? AND user_id = ?
    `);
    const res = stmt.run(
      data.state_of_mind,
      data.struggle,
      data.count_blessing,
      data.prayer_request,
      aob,
      now,
      id,
      user_id
    );
    return res.changes > 0;
  }
}

export async function deleteCheckIn(d1: any, id: number, user_id: number): Promise<boolean> {
  const db = getD1(d1);
  if (db) {
    await seedD1IfNeeded(db);
    const res = await db.prepare('DELETE FROM check_ins WHERE id = ? AND user_id = ?').bind(id, user_id).run();
    return (res?.meta?.changes ?? 0) > 0;
  } else {
    const local = getLocalDb();
    const stmt = local.prepare('DELETE FROM check_ins WHERE id = ? AND user_id = ?');
    const res = stmt.run(id, user_id);
    return res.changes > 0;
  }
}
