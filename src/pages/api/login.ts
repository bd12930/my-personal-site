import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { verifyPassword } from '../../lib/db';
import { setSession } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const username = data.get('username')?.toString()?.trim();
    const password = data.get('password')?.toString();

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const d1 = (env as any)?.DB;
    const isValid = await verifyPassword(d1, username, password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    setSession({ cookies }, username);

    return new Response(JSON.stringify({ success: true }), {
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
