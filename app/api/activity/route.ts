export async function POST() {
  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(
    { visits30m: 0, offerClicks24h: 0 },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
