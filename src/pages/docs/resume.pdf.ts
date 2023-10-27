import type { APIRoute } from "astro";

import { getData } from "../../data";
import { printResume } from "../../pdf/printResume";

export const GET: APIRoute = async function get() {
  try {
    const resume_uuid = import.meta.env.RESUME_UUID;

    const { resume } = await getData(resume_uuid);

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
