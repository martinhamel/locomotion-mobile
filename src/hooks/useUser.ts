import axios from "axios";
import { useEffect, useState } from "react";

const useUser = (tokens: Tokens | undefined): (User|undefined) => {
    const [user, setUser] = useState<User|undefined>();
    useEffect(() => {
        if(tokens){
            (async () => {
                const {data: newUser} = await axios.get("http://localhost:8010/proxy/api/v1/auth/user?fields=*,avatar.*,borrower.*,communities.*,communities.parent.*,loanables.*,!loanables.events,loanables.image.*,loanables.loans.*,loanables.loans.actions.*,loanables.loans.borrower.id,loanables.loans.borrower.user.avatar.*,loanables.loans.borrower.user.full_name,loanables.loans.borrower.user.id,loans.*,loans.total_final_cost,!loans.actual_price,!loans.actual_insurance,loans.actions.*,loans.borrower.id,loans.borrower.user.avatar,loans.borrower.user.full_name,loans.borrower.user.id,loans.loanable.id,loans.loanable.community.name,loans.loanable.image.*,loans.loanable.name,loans.loanable.owner.id,loans.loanable.owner.user.avatar.*,loans.loanable.owner.user.full_name,loans.loanable.owner.user.id,loans.loanable.type,owner.*,payment_methods.*", {
                    headers: {
                        Authorization: `Bearer ${tokens.access_token}`
                    }
                })
                setUser(newUser);
            })()
        }
    }, [tokens?.access_token])

    return user;
} ;

export default useUser;
