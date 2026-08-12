export type ActivitySummary = {
  visits30m: number;
  offerClicks24h: number;
};

const createActivityTable = `
  CREATE TABLE IF NOT EXISTS activity_events (
    id TEXT PRIMARY KEY NOT NULL,
    session_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`;

async function prepareD1(d1: D1Database) {
  await d1.prepare(createActivityTable).run();
  return d1;
}

export async function saveActivity(
  d1Binding: D1Database,
  event: { id: string; sessionId: string; kind: "visit" | "offer_click" },
) {
  const d1 = await prepareD1(d1Binding);
  await d1.prepare(
    `INSERT OR IGNORE INTO activity_events (id, session_id, kind, created_at)
     VALUES (?, ?, ?, ?)`,
  ).bind(event.id, event.sessionId, event.kind, Date.now()).run();
}

export async function getActivitySummary(d1Binding: D1Database): Promise<ActivitySummary> {
  const d1 = await prepareD1(d1Binding);
  const now = Date.now();
  const result = await d1.prepare(
    `SELECT
       COUNT(DISTINCT CASE WHEN kind = 'visit' AND created_at >= ? THEN session_id END) AS visits30m,
       COUNT(DISTINCT CASE WHEN kind = 'offer_click' AND created_at >= ? THEN session_id END) AS offerClicks24h
     FROM activity_events`,
  ).bind(now - 30 * 60 * 1000, now - 24 * 60 * 60 * 1000).first<ActivitySummary>();

  return {
    visits30m: Number(result?.visits30m ?? 0),
    offerClicks24h: Number(result?.offerClicks24h ?? 0),
  };
}
