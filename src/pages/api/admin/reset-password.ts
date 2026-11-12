import type { APIRoute } from 'astro';
import { getSessionUser } from '../../../lib/auth';
import { updateUserPassword, getUserByUsername } from '../../../lib/db';

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
    const targetUsername = data.get('username')?.toString()?.trim();
    const newPassword = data.get('new_password')?.toString();

    if (!targetUsername || !newPassword) {
      return new Response(JSON.stringify({ message: 'Target username and new password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const targetUser = getUserByUsername(targetUsername);
    if (!targetUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    updateUserPassword(targetUsername, newPassword);

    return new Response(JSON.stringify({ success: true, message: `Password for ${targetUsername} successfully reset.` }), {
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
