import { useCallback } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { isVersionAtLeast as checkVersion } from "../utils/webapp";

export const useWebAppVersion = () => {

    const webApp = useTelegramWebApp();

    const isVersionAtLeast = useCallback((version: string) => checkVersion(webApp, version), [webApp]);

    return {
        version: webApp?.version,
        isVersionAtLeast
    };

};
