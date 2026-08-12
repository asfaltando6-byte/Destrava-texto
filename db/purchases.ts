export type PublicPurchase = {
  id: string;
  firstName: string;
  productName: string;
  paidAt: number;
};

const createPurchasesTable = `
  CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    product_name TEXT NOT NULL,
    paid_at INTEGER NOT NULL,
    received_at INTEGER NOT NULL
  )
`;

async function prepareD1(d1: D1Database) {
  await d1.prepare(createPurchasesTable).run();
  return d1;
}

export async function savePurchase(d1Binding: D1Database, purchase: PublicPurchase) {
  const d1 = await prepareD1(d1Binding);
  await d1.prepare(
    `INSERT OR IGNORE INTO purchases (id, first_name, product_name, paid_at, received_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).bind(
    purchase.id,
    purchase.firstName,
    purchase.productName,
    purchase.paidAt,
    Date.now(),
  ).run();
}

export async function listRecentPurchases(d1Binding: D1Database, limit = 8): Promise<PublicPurchase[]> {
  const d1 = await prepareD1(d1Binding);
  const safeLimit = Math.min(Math.max(limit, 1), 12);
  const result = await d1.prepare(
    `SELECT id, first_name AS firstName, product_name AS productName, paid_at AS paidAt
     FROM purchases
     ORDER BY paid_at DESC
     LIMIT ?`,
  ).bind(safeLimit).all<PublicPurchase>();
  return result.results ?? [];
}
