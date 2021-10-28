import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import config from "../config";

export default (type: LoanableType) => {
  const { tokens } = useContext(AppContext) as AppContextType;
  const [loading, setLoading] = useState(false);
  const [loanables, setLoanables] = useState<Loanable[]>();
  const [filteredLoanables, setFilteredLoanables] = useState<{bike: Loanable[], car: Loanable[], trailer: Loanable[]}>({bike: [], car: [], trailer: []});

  // We are loading all the loanables 
  useEffect(() => {
    (async () => {
      setLoading(true);
      const {
        data: { data: loanables },
      }: { data: { data: [Loanable] } } = await axios.get(
        `${config.API_URL}/api/v1/loanables?order=name&page=1&per_page=900&q=&fields=id,type,name,position_google,available,owner.user.id,owner.user.name,owner.user.full_name,owner.user.avatar,image.*`,
        {
          headers: {
            Authorization: `Bearer ${tokens?.access_token}`,
          },
        }
      );
      setLoading(false);
      setLoanables(loanables);      
    })();
  }, [tokens?.access_token]);

  // testing loanables to know if they are available.
  // We are doing it in 2 steps because it is too slow to do all on the 1st effect.
  useEffect(() => {
    if (loanables) {
      if(filteredLoanables[type].length > 0){
        return
      }
      setLoading(true);
      setFilteredLoanables({...filteredLoanables, [type]: []});
      (async () => {
        const availableLoanables = await Promise.all(
          loanables
            .filter(l => l.type === type)
            .map(async (l) => {
              try{
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
              }catch (e) {
                console.error(e);
                return {loanable: l, available: false}
              }
            })
        );
        const filteredAvailableLoanables = availableLoanables.filter(
          (l) => l.available
        );
        const floanables = filteredAvailableLoanables.map(
          (l) => l.loanable
        );
        setLoading(false);
        setFilteredLoanables({...filteredLoanables, [type]: floanables});
      })();
    }
  }, [loanables, type]);
  return { loanables: filteredLoanables[type], loading };
};

