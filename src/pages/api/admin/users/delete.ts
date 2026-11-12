import type { APIRoute } from 'astro';
import { getSessionUser } from '../../../../lib/auth';
import { deleteUser } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  const currentUser = getSessionUser({ cookies });
  if (!currentUser || currentUser.is_admin !== 1) {
    return new Response(JSON.stringify({ message: 'Unauthorized: Admin access required' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.formData();
    const username = data.get('username')?.toString()?.trim();

    if (!username) {
      return new Response(JSON.stringify({ message: 'Username is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (username === currentUser.username) {
      return new Response(JSON.stringify({ message: 'Cannot delete your own admin account' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    deleteUser(username);

    return new Response(JSON.stringify({ success: true, message: `User ${username} deleted successfully.` }), {
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
