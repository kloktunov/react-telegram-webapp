import { useEffect, useState } from "react";
import { useWebAppViewport } from "./useWebAppViewport";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";

export const useWebAppIsExpanded = () => {

    const webApp = useTelegramWebApp();
    const { viewportHeight } = useWebAppViewport();
    const [isExpanded, setIsExpanded] = useState(webApp?.isExpanded ?? false)

    const expand = () => {

        webApp?.expand();
        setIsExpanded(true);

    }

    useEffect(() => {
        
        setIsExpanded(webApp?.isExpanded ?? false);

    }, [webApp, viewportHeight]);

    return { isExpanded, expand };

};
