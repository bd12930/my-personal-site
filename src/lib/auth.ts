import type { APIContext } from 'astro';
import { getUserByUsername, type User } from './db';

const SESSION_COOKIE_NAME = 'site_session';

export async function getSessionUser(context: APIContext | { cookies: Astro.Cookies; locals?: any }): Promise<(User & { is_admin: number }) | null> {
  const cookie = context.cookies.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) return null;

  try {
    const username = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const d1 = (context as any).locals?.runtime?.env?.DB;
    const user = await getUserByUsername(d1, username);
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
    };
  } catch {
    return null;
  }
}

export function setSession(context: APIContext | { cookies: Astro.Cookies }, username: string) {
  const encoded = Buffer.from(username).toString('base64');
  context.cookies.set(SESSION_COOKIE_NAME, encoded, {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
}

export function clearSession(context: APIContext | { cookies: Astro.Cookies }) {
  context.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}
