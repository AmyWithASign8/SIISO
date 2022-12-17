import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const createNews = async (
  title: string,
  description: string,
  imageUrl: any
) => {
  const { data } = await $authHost.post("api/news", {
    title,
    description,
    imageUrl,
  });
  return data;
};
export const getAllNews = async () => {
  const { data } = await $host.get("api/news");
  return data;
};
