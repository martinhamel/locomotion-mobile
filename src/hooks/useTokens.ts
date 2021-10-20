import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTokens = (): [Tokens | undefined, (tokens: Tokens) => void] => {
  const [tokens, setTokens] = useState<Tokens>();
  useEffect(() => {
    (async () => {
      const tokensString = await AsyncStorage.getItem("tokens");
      if (tokensString) {
        const oldTokens = JSON.parse(tokensString);
        setTokens(oldTokens);
      }
    })();
  }, [tokens?.access_token]);

  const setTokens2 = (tokens: Tokens) => {
    AsyncStorage.setItem("tokens", JSON.stringify(tokens));
    setTokens(tokens);
  };

  return [tokens, setTokens2];
};

export default useTokens;
