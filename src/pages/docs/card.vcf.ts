import type { APIRoute } from "astro";

import { getData } from "../../data";
import { printCard } from "../../pdf/printCard";

export const get: APIRoute = async function get() {
  try {
    const resume_uuid = import.meta.env.RESUME_UUID;

    const { resume } = await getData(resume_uuid);

    const cardFile: any = await printCard(resume);

    return { body: cardFile, encoding: "utf-8" };
  } catch (error: unknown) {
    return new Response(
      `Something went wrong in pdf-resource.pdf route!: ${error as string}`,
      {
        status: 501,
        statusText: "Server error",
      }
    );
  }
};
