import axios from "axios";

export async function getData(username: string) {
  const {
    data: [page],
  } = await axios.get(`https://resumo.me/wp-json/wp/v2/users?slug=${username}`);

  if (!page) return { resume: undefined, theme: undefined };

  const { acf } = page;
  const { resume, theme } = acf;

  return { resume, theme };
}
