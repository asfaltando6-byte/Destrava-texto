import { savePurchase } from "../../../db/purchases";

type CaktoWebhook = {
  event?: string;
  secret?: string;
  data?: {
    id?: string;
    status?: string;
    paidAt?: string;
    customer?: { name?: string };
    product?: { name?: string };
  };
};

function firstNameFrom(fullName: string) {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  return first.replace(/[^\p{L}'’-]/gu, "").slice(0, 30);
}

export async function POST(request: Request) {
  const { env } = await import("cloudflare:workers");
  const token = new URL(request.url).searchParams.get("token");
  if (!env.CAKTO_WEBHOOK_TOKEN || token !== env.CAKTO_WEBHOOK_TOKEN) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let payload: CaktoWebhook;
  try {
    payload = await request.json() as CaktoWebhook;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (payload.event !== "purchase_approved") {
    return Response.json({ ok: true, ignored: true });
  }

  const data = payload.data;
  const firstName = firstNameFrom(data?.customer?.name ?? "");
  if (!data?.id || data.status !== "paid" || !firstName) {
    return Response.json({ ok: false }, { status: 422 });
  }

  const paidAt = Date.parse(data.paidAt ?? "") || Date.now();
  if (!env.DB) return Response.json({ ok: false }, { status: 503 });
  await savePurchase(env.DB, {
    id: data.id,
    firstName,
    productName: "DestravaTexto",
    paidAt,
  });

  return Response.json({ ok: true });
}
