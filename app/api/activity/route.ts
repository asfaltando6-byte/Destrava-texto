import { getActivitySummary, saveActivity } from "../../../db/activity";

type ActivityBody = {
  id?: string;
  sessionId?: string;
  kind?: "visit" | "offer_click";
};

const safeId = /^[a-zA-Z0-9:_-]{8,120}$/;

export async function POST(request: Request) {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) return Response.json({ ok: false }, { status: 503 });

  let body: ActivityBody;
  try {
    body = await request.json() as ActivityBody;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (
    !body.id || !safeId.test(body.id) ||
    !body.sessionId || !safeId.test(body.sessionId) ||
    (body.kind !== "visit" && body.kind !== "offer_click")
  ) {
    return Response.json({ ok: false }, { status: 422 });
  }

  await saveActivity(env.DB, {
    id: body.id,
    sessionId: body.sessionId,
    kind: body.kind,
  });
  return Response.json({ ok: true });
}

export async function GET() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) return Response.json({ visits30m: 0, offerClicks24h: 0 });
  const summary = await getActivitySummary(env.DB);
  return Response.json(summary, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
