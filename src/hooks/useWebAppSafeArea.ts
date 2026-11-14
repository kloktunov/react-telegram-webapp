import { useEffect, useState } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";
import { useWebAppEvent } from "./useWebAppEvent";

const EMPTY_INSET: TelegramWebApps.SafeAreaInset = { top: 0, bottom: 0, left: 0, right: 0 };

// Safe area insets (Bot API 8.0+). safeAreaInset — system UI (notch, navigation bar),
// contentSafeAreaInset — Telegram UI over the Mini App (e.g. header controls in fullscreen).
// Also available in CSS: var(--tg-safe-area-inset-*), var(--tg-content-safe-area-inset-*).
export const useWebAppSafeArea = () => {

    const webApp = useTelegramWebApp();

    const [safeAreaInset, setSafeAreaInset] = useState(webApp?.safeAreaInset ?? EMPTY_INSET);
    const [contentSafeAreaInset, setContentSafeAreaInset] = useState(webApp?.contentSafeAreaInset ?? EMPTY_INSET);

    useEffect(() => {
        setSafeAreaInset({ ...(webApp?.safeAreaInset ?? EMPTY_INSET) });
        setContentSafeAreaInset({ ...(webApp?.contentSafeAreaInset ?? EMPTY_INSET) });
    }, [webApp]);

    useWebAppEvent('safeAreaChanged', () => {
        setSafeAreaInset({ ...(webApp?.safeAreaInset ?? EMPTY_INSET) });
    });

    useWebAppEvent('contentSafeAreaChanged', () => {
        setContentSafeAreaInset({ ...(webApp?.contentSafeAreaInset ?? EMPTY_INSET) });
    });

    return {
        safeAreaInset,
        contentSafeAreaInset
    };

};
