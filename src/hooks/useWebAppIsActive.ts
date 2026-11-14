import { useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { useWebAppEvent } from "./useWebAppEvent";

// false while the Mini App is minimized or in an inactive tab (Bot API 8.0+, always true on older clients)
export const useWebAppIsActive = () => {

    const webApp = useTelegramWebApp();
    const [isActive, setIsActive] = useState(webApp?.isActive ?? true);

    useEffect(() => {
        setIsActive(webApp?.isActive ?? true);
    }, [webApp]);

    useWebAppEvent('activated', () => setIsActive(true));
    useWebAppEvent('deactivated', () => setIsActive(false));

    return isActive;

};
