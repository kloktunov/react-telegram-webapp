import { useCallback, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";
import { isVersionAtLeast } from "../utils/webapp";
import { useWebAppEvent } from "./useWebAppEvent";

// Home screen shortcut (Bot API 8.0+)
export const useWebAppHomeScreen = () => {

    const webApp = useTelegramWebApp();
    const isSupported = isVersionAtLeast(webApp, '8.0');

    const [status, setStatus] = useState<TelegramWebApps.HomeScreenStatus | undefined>();

    useWebAppEvent('homeScreenAdded', () => setStatus('added'));
    useWebAppEvent('homeScreenChecked', (params) => setStatus(params?.status));

    const addToHomeScreen = useCallback(() => {
        if (!isSupported) return;
        webApp?.addToHomeScreen();
    }, [webApp, isSupported]);

    const checkHomeScreenStatus = useCallback(() => {
        return new Promise<TelegramWebApps.HomeScreenStatus>((resolve) => {

            if (!isSupported || !webApp) {
                resolve('unsupported');
                return;
            }

            webApp.checkHomeScreenStatus((result) => {
                setStatus(result);
                resolve(result);
            });

        });
    }, [webApp, isSupported]);

    return {
        isSupported,
        status,
        addToHomeScreen,
        checkHomeScreenStatus
    };

};
