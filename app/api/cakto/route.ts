export async function POST() {
  return Response.json(
    { ok: false, message: "Webhook não configurado para esta hospedagem." },
    { status: 501 },
  );
}
