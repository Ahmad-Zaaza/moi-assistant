import { useLocalStorage } from "usehooks-ts";

export const useAuth = () => {
  const [token] = useLocalStorage<string>("token", "");

  return {
    getAccessToken: () => token,
  };
};
