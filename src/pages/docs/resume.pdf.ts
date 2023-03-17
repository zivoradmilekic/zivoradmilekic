import type { APIRoute } from "astro";

import { getData } from "../../data";
import { printResume } from "../../pdf/printResume";

export const get: APIRoute = async function get() {
  try {
    const resume_uuid = import.meta.env.RESUME_UUID;

    const { resume } = await getData("500f4cc7-9546-4f4b-ba4b-c651d0fbb3cc");

    const resumeFile: any = await printResume(resume);

    return { body: resumeFile.toString("binary"), encoding: "binary" };
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
