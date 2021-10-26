import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTokens = (): [Tokens | null, (tokens: Tokens | null) => void] => {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  useEffect(() => {
    (async () => {
      const tokensString = await AsyncStorage.getItem("tokens");
      console.log(tokensString);
      
      if (tokensString) {
        const oldTokens = JSON.parse(tokensString);
        setTokens(oldTokens);
      }
    })();
  }, [tokens?.access_token]);

  const setTokens2 = (tokens: Tokens | null) => {
    
    AsyncStorage.setItem("tokens", JSON.stringify(tokens));
    setTokens(tokens);
  };

  return [tokens, setTokens2];
};

export default useTokens;
