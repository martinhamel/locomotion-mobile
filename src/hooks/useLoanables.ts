import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import config from "../config";

const useLoanables = (type: LoanableType) => {
  const { tokens } = useContext(AppContext) as AppContextType;
  const [loading, setLoading] = useState(false);
  const [loanables, setLoanables] = useState<Loanable[]>();

  // We are loading all the loanables and testing
  // them to know if they are available.
  useEffect(() => {
    (async () => {
      setLoading(true);
      const {
        data: { data: loanables },
      }: { data: { data: [Loanable] } } = await axios.get(
        `${config.API_URL}/api/v1/loanables?order=name&page=1&per_page=900&type=${type}&q=&fields=id,type,name,position_google,available,owner.user.id,owner.user.name,owner.user.full_name,owner.user.avatar,image.*`,
        {
          headers: {
            Authorization: `Bearer ${tokens?.access_token}`,
          },
        }
      );
      
      const availableLoanables = await Promise.all(
        loanables.map(async (l) => {
          const {
            data: { available },
          } = await axios.get(
            `${config.API_URL}/api/v1/loanables/${l.id}/test?departure_at=2021-10-22+15:15:00&duration_in_minutes=15&estimated_distance=10&loanable_id=${l.id}`,
            {
              headers: {
                Authorization: `Bearer ${tokens?.access_token}`,
              },
            }
          );
          return { loanable: l, available };
        })
      );
      const filteredAvailableLoanables = availableLoanables.filter(
        (l) => l.available
      );
      const filteredLoanables = filteredAvailableLoanables.map(
        (l) => l.loanable
      );
      setLoading(false);
      setLoanables(filteredLoanables);
    })();
  }, [tokens?.access_token]);
  return {loanables, loading};
};

export default useLoanables;
