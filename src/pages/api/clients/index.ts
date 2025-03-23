import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async () => {
  const clients = await db.select().from(Clients);

  return Response.json({ clients });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return Response.json({ id: Number(lastInsertRowid) });
  } catch (err) {
    return Response.json({ method: "POST" });
  }
};
