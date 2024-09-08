import { useCallback } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

// impactOccurred: (
//     style: "light" | "medium" | "heavy" | "rigid" | "soft"
//   ) => HapticFeedback;
//   notificationOccurred: (
//     type: "error" | "success" | "warning"
//   ) => HapticFeedback;
//   selectionChanged: () => HapticFeedback;

export const useWebAppHapticFeedback = (): TelegramWebApps.HapticFeedback => {

    const webApp = useTelegramWebApp();

    const impactOccurred = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): TelegramWebApps.HapticFeedback | undefined  => {
        return webApp?.HapticFeedback.impactOccurred(style);
    }, [webApp])

    const notificationOccurred = useCallback((type: 'error' | 'success' | 'warning'): TelegramWebApps.HapticFeedback | undefined => {
        
        return webApp?.HapticFeedback.notificationOccurred(type);

    }, [webApp]);

    const selectionChanged = useCallback((): TelegramWebApps.HapticFeedback | undefined => {
        
        return webApp?.HapticFeedback.selectionChanged();

    }, [webApp]);

    return {

        impactOccurred,

        notificationOccurred,

        selectionChanged
  
    }
}
