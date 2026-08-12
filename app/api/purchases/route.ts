import { listRecentPurchases } from "../../../db/purchases";

export async function GET() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) return Response.json({ purchases: [] });
  const purchases = await listRecentPurchases(env.DB);
  return Response.json(
    { purchases },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
