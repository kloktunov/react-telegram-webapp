import { useCallback } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

export const useWebAppHapticFeedback = (): TelegramWebApps.HapticFeedback => {

    const webApp = useTelegramWebApp();

    const impactOccurred = useCallback((style: "light" | "medium" | "heavy" | "rigid" | "soft") => {
        
        webApp?.HapticFeedback.impactOccurred(style);

    }, [webApp])

    const notificationOccurred = useCallback((type: "error" | "success" | "warning") => {
        
        webApp?.HapticFeedback.notificationOccurred(type);

    }, [webApp]);

    const selectionChanged = useCallback(() => {
        
        webApp?.HapticFeedback.selectionChanged();

    }, [webApp]);

    return {

        impactOccurred,

        notificationOccurred,

        selectionChanged
  
    }
}
