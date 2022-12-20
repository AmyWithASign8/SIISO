import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const createNews = async (formData: FormData) => {
  const { data } = await $authHost.post("api/news", formData);
  return data;
};
export const getAllNews = async () => {
  const { data } = await $host.get("api/news");
  return data;
};
export const getUserNews = async (id: any) => {
  const { data } = await $host.get(`api/news/selected/${id}`);
  return data;
};
