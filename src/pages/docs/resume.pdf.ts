import type { APIRoute } from "astro";

import { getData } from "../../data";
import { printResume } from "../../pdf/printResume";

export const get: APIRoute = async function get() {
  try {
    const username = import.meta.env.RESUMO_USERNAME;

    const { resume, theme } = await getData(username);

    const resumeFile: any = await printResume(resume, theme[theme.theme_name]);

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
