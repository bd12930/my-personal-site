import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSessionUser } from '../../../../lib/auth';
import { createUser, getUserByUsername } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  const currentUser = await getSessionUser({ cookies });
  if (!currentUser || currentUser.is_admin !== 1) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Admin access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.formData();
    const username = data.get('username')?.toString()?.trim();
    const password = data.get('password')?.toString();
    const isAdmin = data.get('is_admin') === 'true' || data.get('is_admin') === '1';

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const d1 = (env as any)?.DB;
    const existing = await getUserByUsername(d1, username);
    if (existing) {
      return new Response(JSON.stringify({ message: 'Username already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await createUser(d1, username, password, isAdmin);

    return new Response(JSON.stringify({ success: true, message: `User ${username} created successfully.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
