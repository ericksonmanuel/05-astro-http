import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const url = URL.parse(request.url)!;
  const slug = url.searchParams.get("slug");

  if (slug) {
    const posts = await getEntry("blog", slug as string);

    if (!posts) {
      return new Response(JSON.stringify({ message: "Post not found", data: null }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ message: "Post retrieved successfully", data: posts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const posts = await getCollection("blog");

  return new Response(JSON.stringify({ message: "Posts retrieved successfully", data: posts }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
