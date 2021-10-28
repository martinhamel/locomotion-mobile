import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (
  tokens: Tokens | null,
  setTokens: (token: Tokens | null) => void
): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tokens) {
      (async () => {
        try {
          setLoading(true);
          const cachedUserString = await AsyncStorage.getItem("user");
          if (cachedUserString) {
            setLoading(false); 
            setUser(JSON.parse(cachedUserString));
          }
          const { data: newUser }: { data: User } = await axios.get(
            `${config.API_URL}/api/v1/auth/user?fields=*,avatar.*,borrower.*,communities.*,communities.parent.*,loanables.*,!loanables.events,loanables.image.*,loanables.loans.*,loanables.loans.actions.*,loanables.loans.borrower.id,loanables.loans.borrower.user.avatar.*,loanables.loans.borrower.user.full_name,loanables.loans.borrower.user.id,loans.*,loans.total_final_cost,!loans.actual_price,!loans.actual_insurance,loans.actions.*,loans.borrower.id,loans.borrower.user.avatar,loans.borrower.user.full_name,loans.borrower.user.id,loans.loanable.id,loans.loanable.community.name,loans.loanable.image.*,loans.loanable.name,loans.loanable.owner.id,loans.loanable.owner.user.avatar.*,loans.loanable.owner.user.full_name,loans.loanable.owner.user.id,loans.loanable.type,owner.*,payment_methods.*`,
            {
              headers: {
                Authorization: `Bearer ${tokens?.access_token}`,
              },
            }
          );
          setUser(newUser);
          AsyncStorage.setItem("user", JSON.stringify(newUser));
          setLoading(false);
        } catch (e: any) {
          console.error(e);

          if (e.response.status === 401) {
            setTokens(null);
          } else {
            throw e;
          }
        }
      })();
    }
  }, [tokens?.access_token]);

  return [user, loading];
};

