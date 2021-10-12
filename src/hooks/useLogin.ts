import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { useToast } from "react-native-toast-notifications";

const useLogin = (navigation) => {
  const toast = useToast();
  const { setTokens } = useContext(AppContext) as AppContextType;

  return async (email: string, password: string) => {
    try {
      const { data: tokens } = await axios.post(
        "http://192.168.86.51:8000/api/v1/auth/login",
        {
          email,
          password,
          rememberMe: false,
        }
      );
      setTokens(tokens);
      toast.show("Connexion réussie", {type: 'success'})
      navigation.push("Home")
    } catch (e) {
      toast.show("Connexion non réussie", {type: 'warning'})
      console.log(e);
    }
  };
};

export default useLogin;
