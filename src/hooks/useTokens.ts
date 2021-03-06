import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (): [
  Tokens | null,
  (tokens: Tokens | null) => void,
  boolean
] => {
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const tokensString = await AsyncStorage.getItem("tokens");

      if (tokensString) {
        const oldTokens = JSON.parse(tokensString);
        setTokens(oldTokens);
      }
      setLoading(false);
    })();
  }, [tokens?.access_token]);

  const setTokens2 = (tokens: Tokens | null) => {
    AsyncStorage.setItem("tokens", JSON.stringify(tokens));
    setTokens(tokens);
  };

  return [tokens, setTokens2, loading];
};
