import { useCallback, useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { isVersionAtLeast } from "../utils/webapp";

// Orientation lock (Bot API 8.0+). On older clients isSupported is false and the methods do nothing.
export const useWebAppOrientation = () => {

    const webApp = useTelegramWebApp();
    const isSupported = isVersionAtLeast(webApp, '8.0');

    const [isOrientationLocked, setIsOrientationLocked] = useState(webApp?.isOrientationLocked ?? false);

    useEffect(() => {
        setIsOrientationLocked(webApp?.isOrientationLocked ?? false);
    }, [webApp]);

    const lockOrientation = useCallback(() => {
        if (!isSupported) return;
        webApp?.lockOrientation();
        setIsOrientationLocked(true);
    }, [webApp, isSupported]);

    const unlockOrientation = useCallback(() => {
        if (!isSupported) return;
        webApp?.unlockOrientation();
        setIsOrientationLocked(false);
    }, [webApp, isSupported]);

    return {
        isSupported,
        isOrientationLocked,
        lockOrientation,
        unlockOrientation
    };

};
