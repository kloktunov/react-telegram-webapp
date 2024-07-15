import { useCallback, useEffect, useMemo, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";

export const useWebAppVerticalSwipes = () => {

    const webApp = useTelegramWebApp();
    const [isVerticalSwipesEnabled, setIsVerticalSwipesEnabled] = useState(webApp?.isVerticalSwipesEnabled);

    useEffect(() => {
        setIsVerticalSwipesEnabled(webApp?.isVerticalSwipesEnabled);
    }, [webApp]);

    const enableVerticalSwipes = useCallback(() => {
        webApp?.enableVerticalSwipes();
        setIsVerticalSwipesEnabled(true);
    }, [webApp]);

    const disableVerticalSwipes = useCallback(() => {
        webApp?.disableVerticalSwipes();
        setIsVerticalSwipesEnabled(false);
    }, [webApp]);


    return {
        isVerticalSwipesEnabled,
        enableVerticalSwipes,
        disableVerticalSwipes
    };
    
};