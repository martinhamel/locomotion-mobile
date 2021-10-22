import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import config from "../config";

const useLoanables = () => {
  const { tokens } = useContext(AppContext) as AppContextType;
  const [loanables, setLoanables] = useState<[Loanable] | []>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data: loanables },
      }: { data: { data: [Loanable] } } = await axios.get(
        `${config.API_URL}/api/v1/loanables?order=name&page=1&per_page=1000&q=&fields=id,type,name,position_google,available,owner.user.id,owner.user.name,owner.user.full_name,owner.user.avatar,image.*`,
        {
          headers: {
            Authorization: `Bearer ${tokens?.access_token}`,
          },
        }
      );
      setLoanables(loanables);      
    })();
  }, [tokens?.access_token]);
  return loanables;
};

export default useLoanables;
