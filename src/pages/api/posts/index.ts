import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const posts = await getCollection("blog");

  const slug = URL.parse(request.url)!;

  console.log(slug.searchParams.get("slug"));

  return new Response(JSON.stringify({ message: "Posts retrieved successfully", data: posts }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
