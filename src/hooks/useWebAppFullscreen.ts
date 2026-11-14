import { useCallback, useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";
import { isVersionAtLeast } from "../utils/webapp";
import { useWebAppEvent } from "./useWebAppEvent";

// Fullscreen mode (Bot API 8.0+). On older clients isSupported is false and the methods do nothing.
export const useWebAppFullscreen = () => {

    const webApp = useTelegramWebApp();
    const isSupported = isVersionAtLeast(webApp, '8.0');

    const [isFullscreen, setIsFullscreen] = useState(webApp?.isFullscreen ?? false);
    const [error, setError] = useState<TelegramWebApps.FullscreenError | null>(null);

    useEffect(() => {
        setIsFullscreen(webApp?.isFullscreen ?? false);
    }, [webApp]);

    useWebAppEvent('fullscreenChanged', () => {
        setIsFullscreen(webApp?.isFullscreen ?? false);
        setError(null);
    });

    useWebAppEvent('fullscreenFailed', (params) => {
        setError(params?.error ?? 'UNSUPPORTED');
    });

    const requestFullscreen = useCallback(() => {
        if (!isSupported) return;
        webApp?.requestFullscreen();
    }, [webApp, isSupported]);

    const exitFullscreen = useCallback(() => {
        if (!isSupported) return;
        webApp?.exitFullscreen();
    }, [webApp, isSupported]);

    return {
        isSupported,
        isFullscreen,
        error,
        requestFullscreen,
        exitFullscreen
    };

};
