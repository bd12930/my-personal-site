import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getSessionUser } from '../../../lib/auth';
import { createCheckIn, getCheckIns } from '../../../lib/db';

export const GET: APIRoute = async ({ request, cookies }) => {
  const currentUser = await getSessionUser({ cookies });
  if (!currentUser) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const d1 = (env as any)?.DB;
  const items = await getCheckIns(d1, 100);
  return new Response(JSON.stringify({ checkins: items }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const currentUser = await getSessionUser({ cookies });
  if (!currentUser) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json().catch(async () => {
      const form = await request.formData();
      return Object.fromEntries(form.entries());
    });

    const stateOfMind = body.state_of_mind?.toString()?.trim() || 'Pleasant';
    const struggle = body.struggle?.toString()?.trim() || 'None';
    const countBlessing = body.count_blessing?.toString()?.trim() || "I'm loved by God";
    const prayerRequest = body.prayer_request?.toString()?.trim() || "Lord's Prayer";
    const aob = body.aob?.toString()?.trim() || '';

    const d1 = (env as any)?.DB;
    const newId = await createCheckIn(d1, {
      user_id: currentUser.id,
      username: currentUser.username,
      state_of_mind: stateOfMind,
      struggle,
      count_blessing: countBlessing,
      prayer_request: prayerRequest,
      aob,
      devotion_title: body.devotion_title?.toString() || null,
      devotion_passage: body.devotion_passage?.toString() || null,
      devotion_text: body.devotion_text?.toString() || null,
      created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true, id: newId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
