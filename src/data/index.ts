import axios from "axios";

export async function getData(resumo_uuid: string) {
  const { data } = await axios.get(
    `${import.meta.env.RESUME_API_URL}/api/resumes/${resumo_uuid}`,
    {
      headers: {
        "x-api-key": import.meta.env.RESUME_API_KEY,
      },
    },
  );

  return data;
}
