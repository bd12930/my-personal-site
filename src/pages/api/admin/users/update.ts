import type { APIRoute } from 'astro';
import { getSessionUser } from '../../../../lib/auth';
import { updateUsername, getUserByUsername } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const currentUser = await getSessionUser({ cookies, locals });
  if (!currentUser || currentUser.is_admin !== 1) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Admin access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.formData();
    const oldUsername = data.get('old_username')?.toString()?.trim();
    const newUsername = data.get('new_username')?.toString()?.trim();

    if (!oldUsername || !newUsername) {
      return new Response(JSON.stringify({ message: 'Both old and new usernames are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const d1 = (locals as any)?.runtime?.env?.DB;
    const existing = await getUserByUsername(d1, newUsername);
    if (existing) {
      return new Response(JSON.stringify({ message: 'New username is already taken' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await updateUsername(d1, oldUsername, newUsername);

    return new Response(JSON.stringify({ success: true, message: `Username updated from ${oldUsername} to ${newUsername}.` }), {
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
