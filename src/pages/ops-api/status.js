export async function GET() {
  return new Response(JSON.stringify({ ok: true, mode: 'browser-demo' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
