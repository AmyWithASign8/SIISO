import axios from "axios";
import { config } from "dotenv";

const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
