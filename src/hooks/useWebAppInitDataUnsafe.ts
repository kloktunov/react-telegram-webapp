import { useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";

export const useWebAppInitDataUnsafe = () => {

    let webApp = useTelegramWebApp();

    let [initDataUnsafe, setInitDataUnsafe] = useState(webApp?.initDataUnsafe);

    useEffect(() => {

        setInitDataUnsafe(webApp?.initDataUnsafe);

        if(webApp?.initDataUnsafe?.query_id){
        
            localStorage.setItem('init-data-unsafe', JSON.stringify(webApp?.initDataUnsafe));
    
        } else {

            const storageData = localStorage.getItem('init-data-unsafe');

            if(storageData){
                setInitDataUnsafe(JSON.parse(storageData));
            }

        }
    
    }, [webApp]);

    return initDataUnsafe;   

}