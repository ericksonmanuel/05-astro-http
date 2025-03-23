import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const postFound = await getEntry("blog", params.slug as string);

  if (!postFound) {
    return new Response(JSON.stringify({ message: "Post not found", data: null }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Post retrieved successfully", data: postFound }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
