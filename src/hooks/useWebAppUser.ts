import { useEffect, useState } from "react";
import { useWebAppInitDataUnsafe } from "./useWebAppInitDataUnsafe";

export const useWebAppUser = () => {

    const initData = useWebAppInitDataUnsafe();
    const [user, setUser] = useState(initData?.user)

    useEffect(() => {
        
        setUser(initData?.user);

    }, [initData]);

    return user;

};
