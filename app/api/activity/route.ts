type ActivityKind = "visit" | "offer_click";
type ActivityEvent = { sessionId: string; kind: ActivityKind; createdAt: number };

const globalActivity = globalThis as typeof globalThis & {
  destravaActivity?: Map<string, ActivityEvent>;
};
const events = globalActivity.destravaActivity ??= new Map<string, ActivityEvent>();

function summary() {
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;
  for (const [id, event] of events) if (event.createdAt < dayAgo) events.delete(id);
  const recentVisits = new Set<string>();
  const recentClicks = new Set<string>();
  for (const event of events.values()) {
    if (event.kind === "visit" && event.createdAt >= now - 30 * 60 * 1000) recentVisits.add(event.sessionId);
    if (event.kind === "offer_click") recentClicks.add(event.sessionId);
  }
  return { visits30m: recentVisits.size, offerClicks24h: recentClicks.size };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { id?: string; sessionId?: string; kind?: ActivityKind } | null;
  if (!body?.id || !body.sessionId || (body.kind !== "visit" && body.kind !== "offer_click")) {
    return Response.json({ ok: false }, { status: 422 });
  }
  events.set(body.id.slice(0, 140), {
    sessionId: body.sessionId.slice(0, 120),
    kind: body.kind,
    createdAt: Date.now(),
  });
  return Response.json({ ok: true, ...summary() });
}

export async function GET() {
  return Response.json(
    summary(),
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
