import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { useToast } from "react-native-toast-notifications";
import config from "../config";

export default () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { tokens, setTokens } = useContext(AppContext) as AppContextType;

  const login = async (email: string, password: string) => {
    setLoading(true);
    if (!tokens) {
      try {
        const { data: tokens }: { data: Tokens } = await axios.post(
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
        console.error(e);
      } finally{
        setLoading(false);
      }
    }
  };

  return { login, loading };
};
