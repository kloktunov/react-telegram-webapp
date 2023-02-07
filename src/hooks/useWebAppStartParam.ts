import { useEffect, useState } from "react";
import { useWebAppInitDataUnsafe } from "./useWebAppInitDataUnsafe";

export const useWebAppStartParam = () => {

    const initData = useWebAppInitDataUnsafe();
    const [startParam, setStartParam] = useState(initData?.start_param)

    useEffect(() => {
        
        setStartParam(initData?.start_param);

    }, [initData]);

    return startParam;

};
