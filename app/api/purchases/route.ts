export async function GET() {
  return Response.json(
    { purchases: [] },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
