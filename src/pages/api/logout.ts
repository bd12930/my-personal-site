import type { APIRoute } from 'astro';
import { clearSession } from '../../lib/auth';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  clearSession({ cookies });
  const url = new URL(request.url);
  const reason = url.searchParams.get('reason');
  return redirect(reason ? `/login?reason=${encodeURIComponent(reason)}` : '/login');
};

export const POST: APIRoute = async ({ cookies }) => {
  clearSession({ cookies });
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
