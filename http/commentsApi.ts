import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const createNewComment = async (
  newsId: any,
  userId: any,
  comment: any
) => {
  const { data } = await $host.post(`api/comment/create/${newsId}`, {
    newsId,
    userId,
    comment,
  });
  return data;
};
export const getAllComments = async (id: any) => {
  const { data } = await $host.get(`api/comment/getallcomments/${id}`);
  return data;
};
// export const getUserNews = async (id: any) => {
//     const { data } = await $host.get(`api/news/selected/${id}`);
//     return data;
// };
export const getOneComment = async (id: any) => {
  const { data } = await $host.get(`api/comment/getonecomment/${id}`);
  return data;
};
