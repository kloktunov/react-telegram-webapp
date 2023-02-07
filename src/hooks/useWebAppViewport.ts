import { useEffect, useState } from "react"
import { useTelegramWebApp } from "../context/TelegramWebAppContext";

export const useWebAppViewport = () => {

    const webApp = useTelegramWebApp();

    const [viewportHeight, setViewportHeight]  = useState(webApp?.viewportHeight);

    const [isStateStable, setIsStateStable] = useState(webApp?.viewportStableHeight == webApp?.viewportHeight);
    
    useEffect(() => {

        const handleChange = (state: { isStateStable: boolean }) => {

            setViewportHeight(webApp?.viewportHeight);
            setIsStateStable(state.isStateStable);

        };

        handleChange({ isStateStable: webApp?.viewportStableHeight == webApp?.viewportHeight });

        setViewportHeight(webApp?.viewportHeight);

        webApp?.onEvent('viewportChanged', handleChange);

        return () => webApp?.offEvent('viewportChanged', handleChange);

    }, [webApp]);

    return {
        viewportHeight,
        isStateStable
    }

}