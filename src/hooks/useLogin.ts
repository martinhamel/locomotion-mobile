import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import Toast from 'react-native-simple-toast';

const useLogin = (navigation) => {
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
      Toast.show("connexion réussie")
      setTokens(tokens);
      navigation.push("Home")
    } catch (e) {
      Toast.show("connexion échouée")
      console.log(e);
    }
  };
};

export default useLogin;
