import { useEffect, useState } from "react";
import { useWebAppInitDataUnsafe } from "./useWebAppInitDataUnsafe";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

export const useWebAppPlatform = () => {

    const webApp = useTelegramWebApp();
    const [platform, setPlatform] = useState<TelegramWebApps.Platforms>();

    useEffect(() => {
        
        setPlatform(webApp?.platform);

    }, [webApp]);

    return platform;
    
};
