import type { APIRoute } from "astro";

import { getData } from "../../data";

export const GET: APIRoute = async function get() {
  try {
    const resume_uuid = import.meta.env.RESUME_UUID;

    const { resume } = await getData(resume_uuid);

    return {
      body: JSON.stringify(resume),
      encoding: "utf-8",
      headers: { "Content-Type": "application/json" },
    };
  } catch (error: unknown) {
    return new Response(
      `Something went wrong in pdf-resource.pdf route!: ${error as string}`,
      {
        status: 501,
        statusText: "Server error",
      },
    );
  }
};
