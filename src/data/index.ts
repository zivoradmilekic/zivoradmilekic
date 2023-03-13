import axios from "axios";

export async function getData(resumo_uuid: string) {
  const { data } = await axios.get(
    `https://api.malla.rs/api/rest/resumes/${resumo_uuid}`,
    {
      headers: {
        "x-hasura-admin-secret": import.meta.env.HASURA_ADMIN_SECRET,
      },
    }
  );

  return data;
}
