// import { useLocalStorage } from "usehooks-ts";

export const useAuth = () => {
  // const [token] = useLocalStorage<string>("token", "");

  return {
    getAccessToken: () => import.meta.env.VITE_BE_WF_API_KEY,
  };
};
