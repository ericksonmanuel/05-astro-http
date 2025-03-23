import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const clientId = Number(params.id);

  const client = await db.select().from(Clients).where(eq(Clients.id, clientId));

  return Response.json({ client });
};

export const PATCH: APIRoute = async ({ params }) => {
  return Response.json({ method: "PATCH", clientId: params.id });
};

export const DELETE: APIRoute = async ({ params }) => {
  return Response.json({ method: "DELETE", clientId: params.id });
};
