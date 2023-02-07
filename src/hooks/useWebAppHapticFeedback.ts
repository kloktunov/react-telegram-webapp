import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

export const useWebAppHapticFeedback = (): TelegramWebApps.HapticFeedback => {

    const webApp = useTelegramWebApp();

    return {

        impactOccurred: style => {
            
            webApp?.HapticFeedback.impactOccurred(style);

        },

        notificationOccurred: type => {

            webApp?.HapticFeedback.notificationOccurred(type);

        },

        selectionChanged: () => {

            webApp?.HapticFeedback.selectionChanged();

        },


  
    }
}
