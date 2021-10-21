import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { useToast } from "react-native-toast-notifications";
import config from "../config";

const useLogin = () => {
  const toast = useToast();
  const { tokens, setTokens } = useContext(AppContext) as AppContextType;

  return async (email: string, password: string) => {
    if (!tokens) {
      try {
        const { data: tokens } = await axios.post(
          `${config.API_URL}/api/v1/auth/login`,
          {
            email,
            password,
            rememberMe: false,
          }
        );
        setTokens(tokens);
        toast.show("Connexion réussie", { type: "success" });
      } catch (e) {
        toast.show("Connexion non réussie", { type: "warning" });
        console.log(e);
      }
    }
  };
};

export default useLogin;
