import axios from "axios";
import { getBaseApiUrl } from "../utils";
import { useMutation } from "react-query";
const baseURL = getBaseApiUrl();

export function useSignIn() {
  return useMutation(
    async (credentials: { email: string; password: string }) => {
      const response = await axios.post(`${baseURL}/api/login`, credentials);
      return response.data;
    }
  );
}
