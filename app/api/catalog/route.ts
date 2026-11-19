import { loadRequestCatalog } from "@/lib/get-catalog";

export async function GET() {
  const catalog = await loadRequestCatalog();
  return Response.json(catalog);
}
