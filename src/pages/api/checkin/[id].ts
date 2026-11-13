import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSessionUser } from '../../../lib/auth';
import { getCheckInById, updateCheckIn, deleteCheckIn } from '../../../lib/db';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const currentUser = await getSessionUser({ cookies });
  if (!currentUser) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const checkInId = Number(params.id);
  if (!checkInId || isNaN(checkInId)) {
    return new Response(JSON.stringify({ message: 'Invalid check-in ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const d1 = (env as any)?.DB;
  const existing = await getCheckInById(d1, checkInId);
  if (!existing) {
    return new Response(JSON.stringify({ message: 'Check-in not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Strict user data isolation
  if (existing.user_id !== currentUser.id && existing.username !== currentUser.username) {
    return new Response(JSON.stringify({ message: 'Forbidden: You can only edit your own check-ins' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json().catch(async () => {
      const form = await request.formData();
      return Object.fromEntries(form.entries());
    });

    const success = await updateCheckIn(d1, checkInId, currentUser.id, {
      state_of_mind: body.state_of_mind?.toString() || existing.state_of_mind,
      struggle: body.struggle?.toString() || existing.struggle,
      count_blessing: body.count_blessing?.toString() || existing.count_blessing,
      prayer_request: body.prayer_request?.toString() || existing.prayer_request,
      aob: body.aob !== undefined ? body.aob?.toString() : existing.aob
    });

    if (!success) {
      return new Response(JSON.stringify({ message: 'Failed to update check-in' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const currentUser = await getSessionUser({ cookies });
  if (!currentUser) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const checkInId = Number(params.id);
  if (!checkInId || isNaN(checkInId)) {
    return new Response(JSON.stringify({ message: 'Invalid check-in ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const d1 = (env as any)?.DB;
  const existing = await getCheckInById(d1, checkInId);
  if (!existing) {
    return new Response(JSON.stringify({ message: 'Check-in not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Strict user data isolation
  if (existing.user_id !== currentUser.id && existing.username !== currentUser.username) {
    return new Response(JSON.stringify({ message: 'Forbidden: You can only delete your own check-ins' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const success = await deleteCheckIn(d1, checkInId, currentUser.id);
  if (!success) {
    return new Response(JSON.stringify({ message: 'Failed to delete check-in' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
