import { useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

const STORAGE_KEY = 'init-data-unsafe';

export const useWebAppInitDataUnsafe = () => {

    let webApp = useTelegramWebApp();

    let [initDataUnsafe, setInitDataUnsafe] = useState(webApp?.initDataUnsafe);

    useEffect(() => {

        // Inside Telegram — always the current launch data (user, start_param, chat).
        // Before 1.3 the cache was used whenever query_id was missing, i.e. on most launches,
        // so a previous launch (or another account on the same device) leaked into the current one.
        if (webApp?.initData) {

            setInitDataUnsafe(webApp.initDataUnsafe);
            writeCache(webApp.initDataUnsafe);
            return;

        }

        // Outside Telegram (e.g. opened in a browser during development) — last known data
        setInitDataUnsafe(readCache() ?? webApp?.initDataUnsafe);

    }, [webApp]);

    return initDataUnsafe;

}

function readCache(): TelegramWebApps.WebAppInitData | undefined {
    try {
        const storageData = localStorage.getItem(STORAGE_KEY);
        return storageData ? JSON.parse(storageData) : undefined;
    } catch {
        return undefined;
    }
}

function writeCache(data: TelegramWebApps.WebAppInitData) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Storage may be unavailable in some webviews
    }
}
